// import EOS from 'src/config/chains/eos';
import Telos from 'src/config/chains/telos';
// import UX from 'src/config/chains/ux';
// import Wax from 'src/config/chains/wax';
import KOY from 'src/config/chains/koy';
import KoyTestnet from 'src/config/chains/koy-testnet';

import TelosTestnet from 'src/config/chains/telos-testnet';
// import Jungle from 'src/config/chains/jungle';

import { ChainsConfig } from 'src/types/ChainsConfig';

const chains: ChainsConfig = {
    // mainnets: [new EOS('eos'), new Telos('telos'), new UX('ux'), new Wax('wax'), new KOY('koy')],
    mainnets: [new Telos('telos'), new KOY('koy')],
    // mainnets: [new KOY('koy')],
    testnets: [new TelosTestnet('telos-testnet'), new KoyTestnet('koy-testnet')],
    // testnets: [new KoyTestnet('koy-testnet')],
};

export default chains;
