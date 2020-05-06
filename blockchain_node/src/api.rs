// Copyright 2020 The Exonum Team
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//! Cryptocurrency API.

use exonum::{
    blockchain::{BlockProof, IndexProof},
    crypto::{Hash, PublicKey},
    messages::{AnyTx, Verified},
    runtime::CallerAddress as Address,
};
use exonum_merkledb::{proof_map::Raw, ListProof, MapProof};
use exonum_rust_runtime::api::{self, ServiceApiBuilder, ServiceApiState};
use crate::{schema::SchemaImpl, product::Product};

/// Describes the query parameters for the `get_wallet` endpoint.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, PartialEq)]
pub struct ProductQuery {
    /// Public key of the queried wallet.
    pub pub_key: PublicKey,
}

/// Proof of existence for specific wallet.
#[derive(Debug, Serialize, Deserialize)]
pub struct ProductProof {
    /// Proof of the whole wallets table.
    // pub to_table: MapProof<String, PublicKey>,
    /// Proof of the specific wallet in this table.
    pub to_product: MapProof<PublicKey, Product, Raw>,
}

/// Wallet history.
#[derive(Debug, Serialize, Deserialize)]
pub struct ProductHistory {
    /// Proof of the list of transaction hashes.
    pub proof: ListProof<Hash>,
    /// List of above transactions.
    pub transactions: Vec<Verified<AnyTx>>,
}

/// Wallet information.
#[derive(Debug, Serialize, Deserialize)]
pub struct ProductInfo {
    /// Proof of the last block.
    pub block_proof: BlockProof,
    /// Proof of the appropriate wallet.
    pub product_proof: ProductProof,
    /// History of the appropriate wallet.
    pub product_history: Option<ProductHistory>,
}

/// Public service API description.
#[derive(Debug, Clone, Copy)]
pub struct PublicApi;

impl PublicApi {
    /// Endpoint for getting a single wallet.
    pub async fn product_info(
        state: ServiceApiState,
        query: ProductQuery,
    ) -> api::Result<ProductInfo> {
        let IndexProof {
            block_proof,
            index_proof,
            ..
        } = state.data().proof_for_service_index("products").unwrap();

        let currency_schema = SchemaImpl::new(state.service_data());
        let key = query.pub_key;
        let to_product = currency_schema.public.products.get_proof(key);

        let product_proof = ProductProof {
            to_product,
        };
        let product = currency_schema.public.products.get(&key);

        let product_history = product.map(|_| {
            // `history` is always present for existing wallets.
            let history = currency_schema.product_history.get(&key);
            let proof = history.get_range_proof(..);

            let transactions = state.data().for_core().transactions();
            let transactions = history
                .iter()
                .map(|tx_hash| transactions.get(&tx_hash).unwrap())
                .collect();

            ProductHistory {
                proof,
                transactions,
            }
        });

        Ok(ProductInfo {
            block_proof,
            product_proof,
            product_history,
        })
    }

    /// Wires the above endpoint to public scope of the given `ServiceApiBuilder`.
    pub fn wire(builder: &mut ServiceApiBuilder) {
        builder
            .public_scope()
            .endpoint("v1/products/info", Self::product_info);
    }
}
