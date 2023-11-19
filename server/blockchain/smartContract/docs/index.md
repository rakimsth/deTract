# Solidity API

## Detract

### PaperPublished

```solidity
event PaperPublished(bytes32 paperHash, address owner)
```

### ChallengeCreated

```solidity
event ChallengeCreated(bytes32 paperHash, address challenger, uint256 amount)
```

### UpVoted

```solidity
event UpVoted(bytes32 paperHash, address voter)
```

### DownVoted

```solidity
event DownVoted(bytes32 paperHash, address voter)
```

### ClaimedByChallenger

```solidity
event ClaimedByChallenger(bytes32 paperHash, address challenger, uint256 amount)
```

### ClaimedByPaperOwner

```solidity
event ClaimedByPaperOwner(bytes32 paperHash, address paperOwner, uint256 amount)
```

### votingPeriod

```solidity
uint256 votingPeriod
```

### minStakingAmountForDetract

```solidity
uint256 minStakingAmountForDetract
```

### upVoteCount

```solidity
mapping(bytes32 => uint256) upVoteCount
```

### downVoteCount

```solidity
mapping(bytes32 => uint256) downVoteCount
```

### challengeInitiationTime

```solidity
mapping(bytes32 => uint256) challengeInitiationTime
```

### retractionStakeAmount

```solidity
mapping(bytes32 => uint256) retractionStakeAmount
```

### challenger

```solidity
mapping(bytes32 => address) challenger
```

### paperRetractionEvidence

```solidity
mapping(bytes32 => bytes32) paperRetractionEvidence
```

### paperOwner

```solidity
mapping(bytes32 => address) paperOwner
```

### _updateDetractStakeAmountOfPaper

```solidity
function _updateDetractStakeAmountOfPaper(bytes32 _paperHash, uint256 _amount) public
```

### publishPaper

```solidity
function publishPaper(bytes32 _paper, address _owner) public
```

_publish paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paper | bytes32 | paper hash |
| _owner | address | address of the paper owner |

### IsVotingActive

```solidity
modifier IsVotingActive(bytes32 _paperHash)
```

### changeVotingPeriod

```solidity
function changeVotingPeriod(uint256 _time) public
```

### changeMinimumStakingAmountForDetract

```solidity
function changeMinimumStakingAmountForDetract(uint256 _amount) public
```

### challengePaper

```solidity
function challengePaper(bytes32 _paperHash, bytes32 _evidenceHash) public payable
```

_challenge the paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |
| _evidenceHash | bytes32 | evidence hash |

### upVote

```solidity
function upVote(bytes32 _paperHash) public
```

_upvote the paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### downVote

```solidity
function downVote(bytes32 _paperHash) public
```

_downvote the paper_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### claimAmountByChallenger

```solidity
function claimAmountByChallenger(bytes32 _paperHash) public
```

_claim the amount by challenger_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### claimAmountByPaperOwner

```solidity
function claimAmountByPaperOwner(bytes32 _paperHash) public
```

_claim the amount by paper owner_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _paperHash | bytes32 | paper hash |

### receive

```solidity
receive() external payable
```

