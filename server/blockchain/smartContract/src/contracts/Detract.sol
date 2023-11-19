//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/Multicall.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "../interfaces/IDetract.sol";

//Retract the paper based on voting
//TODO Add access tokens
//TODO Create struct for paper and use it in place of bytes32 mapping
//TODO Manage double voting

contract Detract is IDetract, Multicall {
    using EnumerableSet for EnumerableSet.Bytes32Set;
    using EnumerableSet for EnumerableSet.AddressSet;

    event PaperPublished(
        bytes32 indexed paperHash,
        string paper,
        address indexed owner
    );
    event ChallengeCreated(
        bytes32 indexed paperHash,
        address indexed challenger,
        string paper,
        string evidence
    );
    event UpVoted(
        bytes32 indexed paperHash,
        string paper,
        address indexed voter
    );
    event DownVoted(
        bytes32 indexed paperHash,
        string paper,
        address indexed voter
    );
    event ClaimedByChallenger(
        bytes32 indexed paperHash,
        string paper,
        address indexed challenger,
        uint256 amount
    );
    event ClaimedByPaperOwner(
        bytes32 indexed paperHash,
        string paper,
        address indexed paperOwner,
        uint256 amount
    );

    uint256 public votingPeriod = 1 weeks;
    uint256 public minStakingAmountForDetract = 0.0001 ether;

    mapping(bytes32 => uint256) public upVoteCount; // upVotes for Retraction
    mapping(bytes32 => uint256) public downVoteCount; //downVotes for Retraction
    mapping(bytes32 => uint256) public challengeInitiationTime;
    mapping(bytes32 => uint256) public retractionStakeAmount;
    mapping(bytes32 => address) public challenger;
    mapping(bytes32 => bytes32) public paperRetractionEvidence;
    //mapping(address => bytes32[]) public papers;
    mapping(address => EnumerableSet.Bytes32Set) private papers;
    mapping(bytes32 => address) public paperOwner;
    mapping(address => mapping(bytes32 => bool)) public hasVoted;

    function _updatePaperOwner(address _owner, bytes32 _paper) private {
        if (paperOwner[_paper] != address(0)) papers[_owner].remove(_paper);
        papers[_owner].add(_paper);
        paperOwner[_paper] = _owner;
    }

    function _updateDetractStakeAmountOfPaper(
        bytes32 _paperHash,
        uint256 _amount
    ) public {
        retractionStakeAmount[_paperHash] += _amount;
    }

    function findHash(string memory _paper) public pure returns (bytes32) {
        return keccak256(bytes(_paper));
    }

    ///@dev publish paper
    ///@param _owner address of the paper owner
    ///@param _paper paper hash
    function publishPaper(string memory _paper, address _owner) public {
        bytes32 _paperHash = findHash(_paper);
        _updatePaperOwner(_owner, _paperHash);
        emit PaperPublished(_paperHash, _paper, _owner);
    }

    ///@dev check if voting is active for the paper
    ///@param _paperHash paper hash
    function _isVotingActive(bytes32 _paperHash) private view returns (bool) {
        return
            block.timestamp <
            challengeInitiationTime[_paperHash] + votingPeriod;
    }

    modifier IsVotingActive(string memory _paper) {
        bytes32 _paperHash = findHash(_paper);
        require(
            _isVotingActive(_paperHash),
            "Voting is not active for this paper"
        );
        _;
    }

    function changeVotingPeriod(uint256 _time) public {
        votingPeriod = _time;
    }

    function changeMinimumStakingAmountForDetract(uint256 _amount) public {
        minStakingAmountForDetract = _amount;
    }

    ///@dev challenge the paper
    ///@param _paper paper hash
    ///@param _evidence evidence hash
    function challengePaper(
        string memory _paper,
        string memory _evidence
    ) public payable {
        bytes32 _paperHash = findHash(_paper);
        bytes32 _evidenceHash = findHash(_evidence);
        require(
            msg.value >= minStakingAmountForDetract,
            "Insufficient amount for detract"
        );
        require(
            !_isVotingActive(_paperHash),
            "Voting is already active for this paper"
        );
        _updateDetractStakeAmountOfPaper(_paperHash, msg.value);
        upVoteCount[_paperHash] = 0;
        downVoteCount[_paperHash] = 0;
        challengeInitiationTime[_paperHash] = block.timestamp;
        paperRetractionEvidence[_paperHash] = _evidenceHash;
        challenger[_paperHash] = msg.sender;
        emit ChallengeCreated(_paperHash, msg.sender, _paper, _evidence);
    }

    ///@dev upvote the paper
    ///@param _paper paper hash
    function upVote(string memory _paper) public IsVotingActive(_paper) {
        bytes32 _paperHash = findHash(_paper);
        require(hasVoted[msg.sender][_paperHash] == false, "Already voted");
        upVoteCount[_paperHash] += 1;
        hasVoted[msg.sender][_paperHash] = true;
        emit UpVoted(_paperHash, _paper, msg.sender);
    }

    ///@dev downvote the paper
    ///@param _paper paper hash
    function downVote(string memory _paper) public IsVotingActive(_paper) {
        bytes32 _paperHash = findHash(_paper);
        require(hasVoted[msg.sender][_paperHash] == false, "Already voted");
        downVoteCount[_paperHash] += 1;
        hasVoted[msg.sender][_paperHash] = true;
        emit DownVoted(_paperHash, _paper, msg.sender);
    }

    ///@dev claim the amount by challenger
    ///@param _paper paper hash
    function claimAmountByChallenger(string memory _paper) public {
        bytes32 _paperHash = findHash(_paper);
        require(!_isVotingActive(_paperHash), "Voting is active");
        require(
            upVoteCount[_paperHash] > downVoteCount[_paperHash],
            "challenger lost the challenge"
        );
        //pay the challenger
        payable(paperOwner[_paperHash]).transfer(
            retractionStakeAmount[_paperHash]
        );
        emit ClaimedByChallenger(
            _paperHash,
            _paper,
            msg.sender,
            retractionStakeAmount[_paperHash]
        );
    }

    ///@dev claim the amount by paper owner
    ///@param _paper paper hash
    function claimAmountByPaperOwner(string memory _paper) public {
        bytes32 _paperHash = findHash(_paper);
        require(!_isVotingActive(_paperHash), "Voting is active");

        require(
            downVoteCount[_paperHash] > upVoteCount[_paperHash],
            "paperOwner lost the challenge"
        );
        //pay the paper owner
        payable(msg.sender).transfer(retractionStakeAmount[_paperHash]);
        emit ClaimedByPaperOwner(
            _paperHash,
            _paper,
            msg.sender,
            retractionStakeAmount[_paperHash]
        );
    }

    receive() external payable {}
}
