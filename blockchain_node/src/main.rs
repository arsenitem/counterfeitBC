<<<<<<< Updated upstream
fn main() {
    println!("Hello, world!");
}
=======
use exonum_cli::{NodeBuilder, Spec};
use counterfeitBC::CounterfeitService;


use failure::Error;
use std:: env;
#[tokio::main]
async fn main() -> anyhow:: Result<()> 
{

    exonum::helpers::init_logger()?;

    NodeBuilder::new()
        .with(Spec:: new(CounterfeitService).with_default_instance())
        .run()    
        .await    
}


>>>>>>> Stashed changes
