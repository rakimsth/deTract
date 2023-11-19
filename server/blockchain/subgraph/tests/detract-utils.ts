import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ChallengeCreated,
  ClaimedByChallenger,
  ClaimedByPaperOwner,
  DownVoted,
  PaperPublished,
  UpVoted
} from "../generated/Detract/Detract"

export function createChallengeCreatedEvent(
  paperHash: Bytes,
  challenger: Address,
  paper: string,
  evidence: string
): ChallengeCreated {
  let challengeCreatedEvent = changetype<ChallengeCreated>(newMockEvent())

  challengeCreatedEvent.parameters = new Array()

  challengeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "paperHash",
      ethereum.Value.fromFixedBytes(paperHash)
    )
  )
  challengeCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "challenger",
      ethereum.Value.fromAddress(challenger)
    )
  )
  challengeCreatedEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromString(paper))
  )
  challengeCreatedEvent.parameters.push(
    new ethereum.EventParam("evidence", ethereum.Value.fromString(evidence))
  )

  return challengeCreatedEvent
}

export function createClaimedByChallengerEvent(
  paperHash: Bytes,
  paper: string,
  challenger: Address,
  amount: BigInt
): ClaimedByChallenger {
  let claimedByChallengerEvent = changetype<ClaimedByChallenger>(newMockEvent())

  claimedByChallengerEvent.parameters = new Array()

  claimedByChallengerEvent.parameters.push(
    new ethereum.EventParam(
      "paperHash",
      ethereum.Value.fromFixedBytes(paperHash)
    )
  )
  claimedByChallengerEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromString(paper))
  )
  claimedByChallengerEvent.parameters.push(
    new ethereum.EventParam(
      "challenger",
      ethereum.Value.fromAddress(challenger)
    )
  )
  claimedByChallengerEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimedByChallengerEvent
}

export function createClaimedByPaperOwnerEvent(
  paperHash: Bytes,
  paper: string,
  paperOwner: Address,
  amount: BigInt
): ClaimedByPaperOwner {
  let claimedByPaperOwnerEvent = changetype<ClaimedByPaperOwner>(newMockEvent())

  claimedByPaperOwnerEvent.parameters = new Array()

  claimedByPaperOwnerEvent.parameters.push(
    new ethereum.EventParam(
      "paperHash",
      ethereum.Value.fromFixedBytes(paperHash)
    )
  )
  claimedByPaperOwnerEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromString(paper))
  )
  claimedByPaperOwnerEvent.parameters.push(
    new ethereum.EventParam(
      "paperOwner",
      ethereum.Value.fromAddress(paperOwner)
    )
  )
  claimedByPaperOwnerEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return claimedByPaperOwnerEvent
}

export function createDownVotedEvent(
  paperHash: Bytes,
  paper: string,
  voter: Address
): DownVoted {
  let downVotedEvent = changetype<DownVoted>(newMockEvent())

  downVotedEvent.parameters = new Array()

  downVotedEvent.parameters.push(
    new ethereum.EventParam(
      "paperHash",
      ethereum.Value.fromFixedBytes(paperHash)
    )
  )
  downVotedEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromString(paper))
  )
  downVotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return downVotedEvent
}

export function createPaperPublishedEvent(
  paperHash: Bytes,
  paper: string,
  owner: Address
): PaperPublished {
  let paperPublishedEvent = changetype<PaperPublished>(newMockEvent())

  paperPublishedEvent.parameters = new Array()

  paperPublishedEvent.parameters.push(
    new ethereum.EventParam(
      "paperHash",
      ethereum.Value.fromFixedBytes(paperHash)
    )
  )
  paperPublishedEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromString(paper))
  )
  paperPublishedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return paperPublishedEvent
}

export function createUpVotedEvent(
  paperHash: Bytes,
  paper: string,
  voter: Address
): UpVoted {
  let upVotedEvent = changetype<UpVoted>(newMockEvent())

  upVotedEvent.parameters = new Array()

  upVotedEvent.parameters.push(
    new ethereum.EventParam(
      "paperHash",
      ethereum.Value.fromFixedBytes(paperHash)
    )
  )
  upVotedEvent.parameters.push(
    new ethereum.EventParam("paper", ethereum.Value.fromString(paper))
  )
  upVotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return upVotedEvent
}
