// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IDetract {
    function publishPaper(string memory _paper, address _owner) external;

    function challengePaper(
        string memory paper,
        string memory evidence
    ) external payable;

    function upVote(string memory paper) external;

    function downVote(string memory paper) external;

    function claimAmountByChallenger(string memory paper) external;

    function claimAmountByPaperOwner(string memory paper) external;
}
