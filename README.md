# The Visitors

A collection of NFT Aliens

This subgraph provide an standard erc-721 implementation deployed into Polygon.

**Link to the hosted service subgraph :**
https://thegraph.com/hosted-service/subgraph/rtomas/the-visitors

---

**Contract from the collection :**
https://polygonscan.com/address/0x0a0bf65248805efa926c39bf51b6dd94e3d1a7af#code

**Official Website :**
https://thevisitorsnft.com/

**Link to opensea colection :**
https://opensea.io/collection/thevisitors

---

## List of some subgraphs querys

Get the top 10 Owners

```
{
	accounts(orderBy:numTokens,orderDirection:desc, first: 10) {
		address
		numTokens
	}
}
```

Get the top 5 newest tokens

```
{
	tokens(first: 5, orderBy:mintTime, orderDirection:desc) {
		tokenID
		owner {
			id
		}
		uri
	}
}
```

Get general info from the collection

```
{
	visitorsInfos(first: 1) {
		numTokens
		numOwners
		numAccounts
		lastBurned
		lastMintDate
		lastTransferDate
	}
}
```
