import Tribes from 0x2e983469d9331d80

pub fun main(tenant: Address, tribeName: String): Tribes.TribeData {

  return Tribes.getTenant(tenant)!.tribes[tribeName]!
}


// import Tribes from 0x1960ff14acc51991

// pub fun main(tenant: Address): [Tribes.TribeData] {

//   return Tribes.getTribeData('Medina Bees').values
// }