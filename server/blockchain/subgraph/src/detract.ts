import {
  ChallengeCreated as ChallengeCreatedEvent,
  ClaimedByChallenger as ClaimedByChallengerEvent,
  ClaimedByPaperOwner as ClaimedByPaperOwnerEvent,
  DownVoted as DownVotedEvent,
  PaperPublished as PaperPublishedEvent,
  UpVoted as UpVotedEvent
} from "../generated/Detract/Detract"
import {
  ChallengeCreated,
  ClaimedByChallenger,
  ClaimedByPaperOwner,
  DownVoted,
  PaperPublished,
  UpVoted
} from "../generated/schema"

export function handleChallengeCreated(event: ChallengeCreatedEvent): void {
  let entity = new ChallengeCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paperHash = event.params.paperHash
  entity.challenger = event.params.challenger
  entity.paper = event.params.paper
  entity.evidence = event.params.evidence

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimedByChallenger(
  event: ClaimedByChallengerEvent
): void {
  let entity = new ClaimedByChallenger(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paperHash = event.params.paperHash
  entity.paper = event.params.paper
  entity.challenger = event.params.challenger
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleClaimedByPaperOwner(
  event: ClaimedByPaperOwnerEvent
): void {
  let entity = new ClaimedByPaperOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paperHash = event.params.paperHash
  entity.paper = event.params.paper
  entity.paperOwner = event.params.paperOwner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDownVoted(event: DownVotedEvent): void {
  let entity = new DownVoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paperHash = event.params.paperHash
  entity.paper = event.params.paper
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaperPublished(event: PaperPublishedEvent): void {
  let entity = new PaperPublished(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paperHash = event.params.paperHash
  entity.paper = event.params.paper
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpVoted(event: UpVotedEvent): void {
  let entity = new UpVoted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.paperHash = event.params.paperHash
  entity.paper = event.params.paper
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
