use serde_derive::{Deserialize, Serialize};

// #![deny(
//     missing_debug_implementations,
//     missing_docs,
//     unsafe_code,
//     bare_trait_objects
// )]

#[macro_use]
extern crate exonum_derive;
#[macro_use]
extern crate failure;
extern crate serde;
#[macro_use]
extern crate protobuf;
#[macro_use]
extern crate serde_derive; // Required for Protobuf.


pub mod proto;

pub mod manufacturer;
