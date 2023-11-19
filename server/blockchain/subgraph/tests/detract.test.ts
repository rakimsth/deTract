import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ChallengeCreated } from "../generated/schema"
import { ChallengeCreated as ChallengeCreatedEvent } from "../generated/Detract/Detract"
import { handleChallengeCreated } from "../src/detract"
import { createChallengeCreatedEvent } from "./detract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let paperHash = Bytes.fromI32(1234567890)
    let challenger = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let paper = "Example string value"
    let evidence = "Example string value"
    let newChallengeCreatedEvent = createChallengeCreatedEvent(
      paperHash,
      challenger,
      paper,
      evidence
    )
    handleChallengeCreated(newChallengeCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ChallengeCreated created and stored", () => {
    assert.entityCount("ChallengeCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ChallengeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "paperHash",
      "1234567890"
    )
    assert.fieldEquals(
      "ChallengeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "challenger",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ChallengeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "paper",
      "Example string value"
    )
    assert.fieldEquals(
      "ChallengeCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "evidence",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
