import { Bytes } from '@graphprotocol/graph-ts'
import { ZERO_ADDRESS } from '@protofire/subgraph-toolkit'
import { Account } from '../../../generated/schema'

export namespace accounts {
  export namespace helpers {
    /* export function getOperatorOwnerId(
			ownerId: string,
			operatorId: string
		): string {
			return ownerId.concat("-".concat(operatorId))
		} */
  }

  export function getOrCreateAccount(accountAddress: Bytes): Account {
    let accountId = accountAddress.toHex()

    let account = Account.load(accountId)
    if (account == null) {
      account = new Account(accountId)
      account.address = accountAddress
    }
    return account as Account
  }

  export function isAccountExist(accountAddress: Bytes): boolean {
    let accountId = accountAddress.toHex()

    return (Account.load(accountId) != null && accountAddress.toHex() != ZERO_ADDRESS) as boolean
  }
}
