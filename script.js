// ========================================
// GAME STATE
// ========================================

const gameState = {
    portfolio: 10000,
    initialPortfolio: 10000,
    round: 1,
    maxRounds: 50,
    currentToken: null,
    trades: 0,
    wins: 0,
    losses: 0,
    history: [10000], // Portfolio value history for chart
    usedTokens: [] // Track used tokens to avoid repeats
};

// ========================================
// TOKEN DATABASE (100+ TOKENS)
// ========================================

const tokenDatabase = [
    // Memecoins & Community Projects
    { name: "MoonDoge", ticker: "$MDOGE", narrative: "Ex-SHIB devs building community-owned memecoin. Fair launch, no VC.", mcap: "$2.5M", fdv: "$25M", unlock: "90%", prob: { bigPump: 0.15, smallPump: 0.25, chop: 0.35, dump: 0.25 } },
    { name: "PepeAI", ticker: "$PEPEAI", narrative: "AI-generated Pepe variations. Trending on CT. Celebrity holders spotted.", mcap: "$5M", fdv: "$50M", unlock: "85%", prob: { bigPump: 0.18, smallPump: 0.22, chop: 0.25, dump: 0.35 } },
    { name: "ShibaFloki Inu", ticker: "$SHIBOKI", narrative: "Combining best of both memes. CEX listings confirmed. Burn mechanism active.", mcap: "$4M", fdv: "$40M", unlock: "60%", prob: { bigPump: 0.16, smallPump: 0.24, chop: 0.30, dump: 0.30 } },
    { name: "ElonPepe", ticker: "$EPEPE", narrative: "Elon tweeted a frog emoji. Community convinced it's about us. 100K TG members.", mcap: "$1M", fdv: "$10M", unlock: "95%", prob: { bigPump: 0.22, smallPump: 0.18, chop: 0.20, dump: 0.40 } },
    { name: "SafeMoon 2.0", ticker: "$SAFEV2", narrative: "Reboot by original community. Doxxed team. Lessons learned from V1.", mcap: "$3M", fdv: "$30M", unlock: "70%", prob: { bigPump: 0.14, smallPump: 0.26, chop: 0.30, dump: 0.30 } },
    { name: "GroksAI", ticker: "$GROK", narrative: "Unofficial Grok meme token. Trending after X announcement. Organic growth.", mcap: "$2M", fdv: "$20M", unlock: "100%", prob: { bigPump: 0.20, smallPump: 0.20, chop: 0.25, dump: 0.35 } },
    { name: "BabyPunks", ticker: "$BABYPNK", narrative: "CryptoPunks derivative. NFT community rally. Floor holders airdropped.", mcap: "$6M", fdv: "$60M", unlock: "50%", prob: { bigPump: 0.15, smallPump: 0.25, chop: 0.35, dump: 0.25 } },
    { name: "WojakCoin", ticker: "$WOJAK", narrative: "Oldest meme. New devs. Nostalgia play. OG holders returning.", mcap: "$800K", fdv: "$8M", unlock: "100%", prob: { bigPump: 0.17, smallPump: 0.23, chop: 0.30, dump: 0.30 } },
    { name: "BoboToken", ticker: "$BOBO", narrative: "Bear market meme. Contrarian play. Chad vs Bobo narrative.", mcap: "$1.5M", fdv: "$15M", unlock: "80%", prob: { bigPump: 0.16, smallPump: 0.24, chop: 0.30, dump: 0.30 } },
    { name: "GigaChad", ticker: "$GIGA", narrative: "Masculinity meme token. Fitness influencers backing it. Marketing loaded.", mcap: "$3.5M", fdv: "$35M", unlock: "65%", prob: { bigPump: 0.14, smallPump: 0.26, chop: 0.32, dump: 0.28 } },
    
    // AI Narrative Tokens
    { name: "AIChain Protocol", ticker: "$AIP", narrative: "VC-backed AI infrastructure layer. Binance Labs invested. Mainnet Q2.", mcap: "$45M", fdv: "$450M", unlock: "10%", prob: { bigPump: 0.10, smallPump: 0.20, chop: 0.40, dump: 0.30 } },
    { name: "NeuralNet", ticker: "$NEURAL", narrative: "Decentralized AI compute marketplace. GPU staking live. OpenAI partnership rumored.", mcap: "$35M", fdv: "$350M", unlock: "15%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.38, dump: 0.27 } },
    { name: "GPT-Chain", ticker: "$GPTC", narrative: "ChatGPT integration for blockchain. Whitepaper by ex-Google AI researchers.", mcap: "$25M", fdv: "$250M", unlock: "8%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.42, dump: 0.23 } },
    { name: "DeepLearn Finance", ticker: "$DLF", narrative: "AI-powered yield optimization. Backtested 40% APY. Audit pending.", mcap: "$15M", fdv: "$150M", unlock: "12%", prob: { bigPump: 0.13, smallPump: 0.22, chop: 0.35, dump: 0.30 } },
    { name: "SingularityDAO", ticker: "$SDAO", narrative: "AGI research funding DAO. Ben Goertzel advisory. Community governance.", mcap: "$20M", fdv: "$200M", unlock: "18%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.40, dump: 0.25 } },
    { name: "VectorDB", ticker: "$VECT", narrative: "Vector database for AI apps. Used by 50+ protocols. Coinbase Ventures backed.", mcap: "$30M", fdv: "$300M", unlock: "9%", prob: { bigPump: 0.09, smallPump: 0.26, chop: 0.45, dump: 0.20 } },
    { name: "AutoGPT Token", ticker: "$AUTO", narrative: "Autonomous AI agents on-chain. No human intervention needed. Bold vision.", mcap: "$10M", fdv: "$100M", unlock: "20%", prob: { bigPump: 0.14, smallPump: 0.21, chop: 0.35, dump: 0.30 } },
    { name: "Cortex AI", ticker: "$CRTX", narrative: "AI model marketplace. Train and monetize models. Stanford researchers involved.", mcap: "$18M", fdv: "$180M", unlock: "11%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    
    // DeFi & Yield
    { name: "SafeYield Finance", ticker: "$SAFE", narrative: "Audited by 3 firms. Doxxed team. Real yield from treasury management.", mcap: "$8M", fdv: "$80M", unlock: "15%", prob: { bigPump: 0.20, smallPump: 0.30, chop: 0.30, dump: 0.20 } },
    { name: "MetaVault DAO", ticker: "$MVAULT", narrative: "Community-governed treasury. 20% APY staking. Partnerships with top protocols.", mcap: "$12M", fdv: "$120M", unlock: "12%", prob: { bigPump: 0.12, smallPump: 0.28, chop: 0.35, dump: 0.25 } },
    { name: "DeFi Omega", ticker: "$OMEGA", narrative: "Fork of Curve with improved tokenomics. OG team advisory. Fair distribution.", mcap: "$5M", fdv: "$50M", unlock: "20%", prob: { bigPump: 0.15, smallPump: 0.25, chop: 0.35, dump: 0.25 } },
    { name: "Stake Haven", ticker: "$HAVEN", narrative: "Institutional-grade staking. Coinbase Ventures backed. SEC-compliant framework.", mcap: "$50M", fdv: "$500M", unlock: "6%", prob: { bigPump: 0.08, smallPump: 0.27, chop: 0.50, dump: 0.15 } },
    { name: "YieldMax Protocol", ticker: "$YMAX", narrative: "Aggregated yield farming. Auto-compound strategies. Gas optimized.", mcap: "$22M", fdv: "$220M", unlock: "14%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.42, dump: 0.23 } },
    { name: "Liquid Rewards", ticker: "$LRD", narrative: "Liquid staking derivatives. No lock periods. Composable across DeFi.", mcap: "$28M", fdv: "$280M", unlock: "10%", prob: { bigPump: 0.09, smallPump: 0.26, chop: 0.45, dump: 0.20 } },
    { name: "TreasureDAO", ticker: "$MAGIC", narrative: "Gaming treasury. Revenue from NFT games. Buyback and burn active.", mcap: "$16M", fdv: "$160M", unlock: "16%", prob: { bigPump: 0.13, smallPump: 0.24, chop: 0.38, dump: 0.25 } },
    
    // Layer 2s & Infrastructure
    { name: "ZeroGas Chain", ticker: "$0GAS", narrative: "L2 with zero transaction fees. Backed by Paradigm. Testnet live.", mcap: "$60M", fdv: "$600M", unlock: "8%", prob: { bigPump: 0.08, smallPump: 0.22, chop: 0.45, dump: 0.25 } },
    { name: "TurboChain", ticker: "$TURBO", narrative: "Fastest chain ever. 500K TPS. Former Google engineers. VC oversubscribed.", mcap: "$75M", fdv: "$750M", unlock: "4%", prob: { bigPump: 0.06, smallPump: 0.24, chop: 0.48, dump: 0.22 } },
    { name: "Quantum Ledger", ticker: "$QLGR", narrative: "Quantum-resistant blockchain. MIT researchers. Whitepaper cited 500+ times.", mcap: "$35M", fdv: "$350M", unlock: "5%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.45, dump: 0.20 } },
    { name: "ParallelEVM", ticker: "$PAEVM", narrative: "Parallel execution EVM. 10x faster than Ethereum. Audits complete.", mcap: "$42M", fdv: "$420M", unlock: "7%", prob: { bigPump: 0.09, smallPump: 0.23, chop: 0.46, dump: 0.22 } },
    { name: "MicroChain", ticker: "$MICRO", narrative: "App-specific rollups. Modular design. Celestia integration. Developer-first.", mcap: "$28M", fdv: "$280M", unlock: "9%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.42, dump: 0.23 } },
    { name: "InterLink Protocol", ticker: "$ILP", narrative: "Cross-chain messaging. Connected 15 chains. No bridge hacks yet.", mcap: "$38M", fdv: "$380M", unlock: "6%", prob: { bigPump: 0.08, smallPump: 0.25, chop: 0.47, dump: 0.20 } },
    
    // NFT & Gaming
    { name: "PixelPunks NFT", ticker: "$PPNFT", narrative: "NFT project launching token. Floor price holding. Celebrity holders.", mcap: "$6M", fdv: "$60M", unlock: "30%", prob: { bigPump: 0.14, smallPump: 0.26, chop: 0.30, dump: 0.30 } },
    { name: "GameFi Arena", ticker: "$GFA", narrative: "Play-to-earn tournament platform. 50K daily users. Mobile app launching.", mcap: "$14M", fdv: "$140M", unlock: "22%", prob: { bigPump: 0.13, smallPump: 0.23, chop: 0.35, dump: 0.29 } },
    { name: "MetaLand Token", ticker: "$MLAND", narrative: "Virtual land marketplace. Integration with 5 metaverses. Early adopter bonus.", mcap: "$9M", fdv: "$90M", unlock: "28%", prob: { bigPump: 0.12, smallPump: 0.25, chop: 0.33, dump: 0.30 } },
    { name: "AvatarDAO", ticker: "$AVTR", narrative: "NFT avatar trading DAO. Royalty sharing. Art from famous digital artists.", mcap: "$7M", fdv: "$70M", unlock: "25%", prob: { bigPump: 0.14, smallPump: 0.24, chop: 0.32, dump: 0.30 } },
    { name: "LootVault", ticker: "$LOOT", narrative: "Gaming NFT aggregator. Rent your items. Passive income for holders.", mcap: "$11M", fdv: "$110M", unlock: "18%", prob: { bigPump: 0.13, smallPump: 0.25, chop: 0.36, dump: 0.26 } },
    
    // High Risk / Suspicious
    { name: "DragonX", ticker: "$DRX", narrative: "Anonymous dev with 10+ successful launches. Stealth launch at midnight.", mcap: "$500K", fdv: "$5M", unlock: "100%", prob: { bigPump: 0.25, smallPump: 0.15, chop: 0.20, dump: 0.40 } },
    { name: "MegaRug Token", ticker: "$MRUG", narrative: "Satirical project poking fun at rugs. Team doxed wallets. YOLO vibes.", mcap: "$800K", fdv: "$8M", unlock: "100%", prob: { bigPump: 0.20, smallPump: 0.15, chop: 0.15, dump: 0.50 } },
    { name: "QuickMoon", ticker: "$QMOON", narrative: "Launched 2 hours ago. Already 3x. FOMO setting in. No website yet.", mcap: "$300K", fdv: "$3M", unlock: "100%", prob: { bigPump: 0.30, smallPump: 0.10, chop: 0.10, dump: 0.50 } },
    { name: "PumpKing", ticker: "$KING", narrative: "Influencer-backed launch. 100K TG members. Marketing budget loaded.", mcap: "$3M", fdv: "$30M", unlock: "50%", prob: { bigPump: 0.18, smallPump: 0.22, chop: 0.25, dump: 0.35 } },
    { name: "AnonymousDev", ticker: "$ANON", narrative: "Dev won't dox. Claims previous project did 100x. Trust the process.", mcap: "$600K", fdv: "$6M", unlock: "100%", prob: { bigPump: 0.22, smallPump: 0.18, chop: 0.20, dump: 0.40 } },
    
    // More DeFi
    { name: "FlashLoan Pro", ticker: "$FLASH", narrative: "Optimized flash loan aggregator. Save on gas. MEV protection built-in.", mcap: "$13M", fdv: "$130M", unlock: "17%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "BondYield", ticker: "$BOND", narrative: "On-chain bonds. Fixed income DeFi. Institutional interest growing.", mcap: "$19M", fdv: "$190M", unlock: "13%", prob: { bigPump: 0.10, smallPump: 0.26, chop: 0.42, dump: 0.22 } },
    { name: "LeverageMax", ticker: "$LVGM", narrative: "Up to 100x leverage trading. Liquidation engine optimized. High risk/reward.", mcap: "$8M", fdv: "$80M", unlock: "20%", prob: { bigPump: 0.15, smallPump: 0.20, chop: 0.30, dump: 0.35 } },
    { name: "StablePlus", ticker: "$SPLUS", narrative: "Algorithmic stablecoin. Better than UST (they claim). Collateralized 120%.", mcap: "$26M", fdv: "$260M", unlock: "11%", prob: { bigPump: 0.09, smallPump: 0.25, chop: 0.44, dump: 0.22 } },
    { name: "UniDex Protocol", ticker: "$UNIDX", narrative: "DEX aggregator aggregator. Find best price across 20+ DEXes.", mcap: "$17M", fdv: "$170M", unlock: "15%", prob: { bigPump: 0.11, smallPump: 0.25, chop: 0.40, dump: 0.24 } },
    
    // Exotic Narratives
    { name: "ClimateCoin", ticker: "$CLMT", narrative: "Carbon credit tokenization. ESG narrative. Corporate partnerships.", mcap: "$21M", fdv: "$210M", unlock: "12%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.43, dump: 0.23 } },
    { name: "RealWorldAsset", ticker: "$RWA", narrative: "Real estate tokenization. Legal framework solid. First properties listed.", mcap: "$32M", fdv: "$320M", unlock: "8%", prob: { bigPump: 0.08, smallPump: 0.27, chop: 0.47, dump: 0.18 } },
    { name: "MusicRights DAO", ticker: "$MUSIC", narrative: "Music royalty sharing. Artists get fair cut. Spotify integration planned.", mcap: "$12M", fdv: "$120M", unlock: "19%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.38, dump: 0.27 } },
    { name: "SocialFi Network", ticker: "$SOCIAL", narrative: "Web3 social media. Own your data. Algorithmic feed you control.", mcap: "$24M", fdv: "$240M", unlock: "14%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "HealthData Token", ticker: "$HLTH", narrative: "Monetize your health data. HIPAA compliant. Pharma companies interested.", mcap: "$15M", fdv: "$150M", unlock: "16%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.42, dump: 0.23 } },
    
    // More Layer 1s/2s
    { name: "SonicChain", ticker: "$SONIC", narrative: "Fastest finality. 400ms blocks. Solana killer narrative.", mcap: "$48M", fdv: "$480M", unlock: "7%", prob: { bigPump: 0.09, smallPump: 0.23, chop: 0.46, dump: 0.22 } },
    { name: "PrivacyLayer", ticker: "$PRIV", narrative: "ZK-rollup with built-in privacy. Compliance-friendly. Regulated entities testing.", mcap: "$36M", fdv: "$360M", unlock: "6%", prob: { bigPump: 0.08, smallPump: 0.25, chop: 0.48, dump: 0.19 } },
    { name: "EcoChain", ticker: "$ECO", narrative: "Carbon-negative blockchain. Proof-of-stake 2.0. Energy efficient.", mcap: "$29M", fdv: "$290M", unlock: "9%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.44, dump: 0.22 } },
    { name: "MobileChain", ticker: "$MOBI", narrative: "Blockchain for mobile devices. Run full node on phone. Unique tech.", mcap: "$18M", fdv: "$180M", unlock: "13%", prob: { bigPump: 0.11, smallPump: 0.23, chop: 0.41, dump: 0.25 } },
    
    // More Gaming
    { name: "BattleRoyale Token", ticker: "$BRTL", narrative: "Web3 battle royale. 100K downloads first week. Esports tournaments planned.", mcap: "$10M", fdv: "$100M", unlock: "21%", prob: { bigPump: 0.13, smallPump: 0.24, chop: 0.36, dump: 0.27 } },
    { name: "RPGQuest", ticker: "$RPGQ", narrative: "On-chain RPG. Items are NFTs. Grinding earns tokens. Nostalgia play.", mcap: "$7M", fdv: "$70M", unlock: "26%", prob: { bigPump: 0.14, smallPump: 0.23, chop: 0.34, dump: 0.29 } },
    { name: "RacingLeague", ticker: "$RACE", narrative: "NFT car racing game. Licensed real car brands. Mobile version Q3.", mcap: "$13M", fdv: "$130M", unlock: "19%", prob: { bigPump: 0.12, smallPump: 0.25, chop: 0.37, dump: 0.26 } },
    
    // Oracles & Data
    { name: "OracleLink", ticker: "$OLINK", narrative: "Decentralized oracle network. 200+ data feeds. Chainlink competitor.", mcap: "$40M", fdv: "$400M", unlock: "8%", prob: { bigPump: 0.09, smallPump: 0.24, chop: 0.46, dump: 0.21 } },
    { name: "DataMarket", ticker: "$DMARKET", narrative: "Sell your browsing data. Privacy-preserving. Brave partnership rumored.", mcap: "$16M", fdv: "$160M", unlock: "15%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "WeatherDAO", ticker: "$WTHR", narrative: "Weather data oracle. Crop insurance DeFi. Real-world utility.", mcap: "$11M", fdv: "$110M", unlock: "17%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.39, dump: 0.26 } },
    
    // More Memes
    { name: "CatCoin", ticker: "$CCAT", narrative: "Dogs had their run. Now it's cat season. Cute marketing.", mcap: "$2.8M", fdv: "$28M", unlock: "75%", prob: { bigPump: 0.17, smallPump: 0.23, chop: 0.28, dump: 0.32 } },
    { name: "HamsterWheel", ticker: "$WHEEL", narrative: "Hamster picks trades. Actually outperforming hedge funds. Viral TikTok.", mcap: "$1.2M", fdv: "$12M", unlock: "88%", prob: { bigPump: 0.19, smallPump: 0.21, chop: 0.25, dump: 0.35 } },
    { name: "MilkToken", ticker: "$MILK", narrative: "Got milk? Community meme. No utility. Just vibes.", mcap: "$900K", fdv: "$9M", unlock: "95%", prob: { bigPump: 0.21, smallPump: 0.19, chop: 0.22, dump: 0.38 } },
    { name: "ToiletPaper", ticker: "$TP", narrative: "Bear market survival kit. Meme from 2020. Revived.", mcap: "$650K", fdv: "$6.5M", unlock: "100%", prob: { bigPump: 0.18, smallPump: 0.22, chop: 0.25, dump: 0.35 } },
    { name: "DiamondHands", ticker: "$DIAMOND", narrative: "For true holders. Penalty for selling. Cult-like community.", mcap: "$4.2M", fdv: "$42M", unlock: "68%", prob: { bigPump: 0.16, smallPump: 0.24, chop: 0.30, dump: 0.30 } },
    
    // More Infrastructure
    { name: "StorageChain", ticker: "$STORE", narrative: "Decentralized storage. Cheaper than AWS. 1PB stored already.", mcap: "$33M", fdv: "$330M", unlock: "10%", prob: { bigPump: 0.09, smallPump: 0.25, chop: 0.45, dump: 0.21 } },
    { name: "ComputeNetwork", ticker: "$COMP", narrative: "Distributed computing. Render farms on-chain. GPU shortage solution.", mcap: "$27M", fdv: "$270M", unlock: "11%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.43, dump: 0.23 } },
    { name: "BandwidthDAO", ticker: "$BWDTH", narrative: "Tokenized internet bandwidth. ISP disruption. Novel concept.", mcap: "$14M", fdv: "$140M", unlock: "16%", prob: { bigPump: 0.11, smallPump: 0.23, chop: 0.40, dump: 0.26 } },
    
    // DAOs & Governance
    { name: "CitizenDAO", ticker: "$CTZN", narrative: "Digital citizenship DAO. Voting rights on-chain. Crypto nation concept.", mcap: "$22M", fdv: "$220M", unlock: "13%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.42, dump: 0.23 } },
    { name: "WorkerCoop", ticker: "$WORK", narrative: "Worker-owned companies on-chain. Profit sharing. Socialist DeFi.", mcap: "$9M", fdv: "$90M", unlock: "21%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.38, dump: 0.27 } },
    { name: "CharityDAO", ticker: "$CHAR", narrative: "Transparent charity donations. Vote on causes. Tax deductible.", mcap: "$17M", fdv: "$170M", unlock: "14%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.41, dump: 0.24 } },
    
    // More AI
    { name: "RobotWorkers", ticker: "$ROBO", narrative: "AI automation tokens. Stake to rent AI workers. Future of work.", mcap: "$31M", fdv: "$310M", unlock: "9%", prob: { bigPump: 0.09, smallPump: 0.25, chop: 0.44, dump: 0.22 } },
    { name: "BrainChain", ticker: "$BRAIN", narrative: "Neural network on blockchain. Decentralized AI training. Ambitious.", mcap: "$23M", fdv: "$230M", unlock: "12%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.42, dump: 0.24 } },
    { name: "PromptMarket", ticker: "$PROMPT", narrative: "Marketplace for AI prompts. Sell your best prompts. ChatGPT era play.", mcap: "$8M", fdv: "$80M", unlock: "19%", prob: { bigPump: 0.13, smallPump: 0.23, chop: 0.37, dump: 0.27 } },
    
    // Privacy & Security
    { name: "AnonymousPay", ticker: "$ANOPAY", narrative: "Untraceable transactions. Mixing protocol. Privacy maximalist.", mcap: "$12M", fdv: "$120M", unlock: "18%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "SecureVault", ticker: "$VAULT", narrative: "Hardware wallet integration. Multi-sig as a service. Security first.", mcap: "$20M", fdv: "$200M", unlock: "12%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.43, dump: 0.22 } },
    { name: "ShieldProtocol", ticker: "$SHLD", narrative: "Insurance for smart contracts. Hacks covered. Peace of mind.", mcap: "$25M", fdv: "$250M", unlock: "11%", prob: { bigPump: 0.09, smallPump: 0.26, chop: 0.44, dump: 0.21 } },
    
    // Derivatives & Trading
    { name: "OptionsFi", ticker: "$OPT", narrative: "On-chain options trading. Black-Scholes on blockchain. Degen paradise.", mcap: "$19M", fdv: "$190M", unlock: "13%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "PerpSwap", ticker: "$PERP", narrative: "Perpetual futures DEX. No KYC. High leverage. Already profitable.", mcap: "$34M", fdv: "$340M", unlock: "8%", prob: { bigPump: 0.09, smallPump: 0.25, chop: 0.46, dump: 0.20 } },
    { name: "SyntheticX", ticker: "$SYNX", narrative: "Synthetic assets. Trade anything. Stocks, gold, NFTs.", mcap: "$28M", fdv: "$280M", unlock: "10%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.44, dump: 0.22 } },
    
    // Education & Creator Economy
    { name: "LearnToEarn", ticker: "$LEARN", narrative: "Get paid to learn coding. Verified certificates on-chain.", mcap: "$11M", fdv: "$110M", unlock: "17%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.39, dump: 0.26 } },
    { name: "CreatorToken", ticker: "$CREATE", narrative: "Patreon killer. Fans buy tokens. Creators monetize directly.", mcap: "$16M", fdv: "$160M", unlock: "15%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "PodcastDAO", ticker: "$POD", narrative: "Decentralized podcast hosting. Ad revenue sharing. Spotify alternative.", mcap: "$9M", fdv: "$90M", unlock: "20%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.38, dump: 0.27 } },
    
    // Identity & Reputation
    { name: "IdentityChain", ticker: "$IDC", narrative: "Self-sovereign identity. No more passwords. Microsoft partnership.", mcap: "$37M", fdv: "$370M", unlock: "7%", prob: { bigPump: 0.08, smallPump: 0.25, chop: 0.47, dump: 0.20 } },
    { name: "ReputationScore", ticker: "$REP", narrative: "On-chain reputation system. Used by 10 protocols. Social credit?", mcap: "$14M", fdv: "$140M", unlock: "16%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "VerifyMe", ticker: "$VERIFY", narrative: "KYC as a service. One verification, use everywhere. Compliance tool.", mcap: "$21M", fdv: "$210M", unlock: "12%", prob: { bigPump: 0.10, smallPump: 0.25, chop: 0.42, dump: 0.23 } },
    
    // Metaverse & Virtual Worlds
    { name: "MetaCity", ticker: "$MCITY", narrative: "Virtual city builder. Own land, build, govern. SimCity meets crypto.", mcap: "$13M", fdv: "$130M", unlock: "18%", prob: { bigPump: 0.12, smallPump: 0.24, chop: 0.37, dump: 0.27 } },
    { name: "VirtualOffice", ticker: "$VOFFICE", narrative: "Remote work in metaverse. Companies buying virtual offices.", mcap: "$18M", fdv: "$180M", unlock: "14%", prob: { bigPump: 0.11, smallPump: 0.24, chop: 0.40, dump: 0.25 } },
    { name: "ConcertVerse", ticker: "$CONCERT", narrative: "Virtual concerts. Artists earning millions. Travis Scott vibes.", mcap: "$15M", fdv: "$150M", unlock: "16%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.39, dump: 0.26 } },
    
    // Supply Chain & Logistics
    { name: "ShipTrack", ticker: "$SHIP", narrative: "Supply chain transparency. Track products blockchain. Amazon interested.", mcap: "$26M", fdv: "$260M", unlock: "11%", prob: { bigPump: 0.09, smallPump: 0.25, chop: 0.44, dump: 0.22 } },
    { name: "FoodChain", ticker: "$FOOD", narrative: "Farm to table tracking. Food safety. Walmart testing.", mcap: "$19M", fdv: "$190M", unlock: "13%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.42, dump: 0.24 } },
    { name: "DiamondTrace", ticker: "$DTRACE", narrative: "Conflict-free diamond verification. De Beers competitor.", mcap: "$23M", fdv: "$230M", unlock: "12%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.43, dump: 0.23 } },
    
    // More Experimental/Risky
    { name: "LuckyDraw", ticker: "$LUCKY", narrative: "On-chain lottery. Provably fair. No house edge. Gambling DeFi.", mcap: "$5M", fdv: "$50M", unlock: "35%", prob: { bigPump: 0.15, smallPump: 0.20, chop: 0.30, dump: 0.35 } },
    { name: "MemeFactory", ticker: "$MFACT", narrative: "Launch your own meme token. Platform coin. Pump.fun clone.", mcap: "$6M", fdv: "$60M", unlock: "30%", prob: { bigPump: 0.14, smallPump: 0.23, chop: 0.32, dump: 0.31 } },
    { name: "YieldHack", ticker: "$YHACK", narrative: "APY too good to be true. Ponzi accusations. Founder won't explain.", mcap: "$4M", fdv: "$40M", unlock: "45%", prob: { bigPump: 0.16, smallPump: 0.19, chop: 0.25, dump: 0.40 } },
    { name: "RugInsurance", ticker: "$RUGINS", narrative: "Insurance against rugs. Ironic launch. Will they rug?", mcap: "$3M", fdv: "$30M", unlock: "55%", prob: { bigPump: 0.17, smallPump: 0.21, chop: 0.27, dump: 0.35 } },
    { name: "MoonShot", ticker: "$SHOT", narrative: "Generic moon mission. No innovation. Pure speculation play.", mcap: "$2M", fdv: "$20M", unlock: "70%", prob: { bigPump: 0.20, smallPump: 0.18, chop: 0.25, dump: 0.37 } },
    
    // Stablecoins & Pegs
    { name: "DollarPeg", ticker: "$DPEG", narrative: "Overcollateralized stablecoin. 150% backed. Lessons from Luna.", mcap: "$42M", fdv: "$420M", unlock: "5%", prob: { bigPump: 0.07, smallPump: 0.28, chop: 0.50, dump: 0.15 } },
    { name: "YuanCoin", ticker: "$YUAN", narrative: "Yuan-pegged stablecoin. Asia market focus. CBDC competitor.", mcap: "$31M", fdv: "$310M", unlock: "8%", prob: { bigPump: 0.08, smallPump: 0.26, chop: 0.48, dump: 0.18 } },
    { name: "GoldBacked", ticker: "$XGLD", narrative: "Gold-backed token. 1:1 with physical gold. Audited vaults.", mcap: "$55M", fdv: "$550M", unlock: "6%", prob: { bigPump: 0.06, smallPump: 0.27, chop: 0.52, dump: 0.15 } },
    
    // Final batch - misc innovation
    { name: "QuantumSafe", ticker: "$QSAFE", narrative: "Future-proof encryption. Preparing for quantum computers. Long-term play.", mcap: "$20M", fdv: "$200M", unlock: "12%", prob: { bigPump: 0.10, smallPump: 0.24, chop: 0.43, dump: 0.23 } },
    { name: "SpaceToken", ticker: "$SPACE", narrative: "Funding asteroid mining. SpaceX partnership rumored. Sci-fi narrative.", mcap: "$12M", fdv: "$120M", unlock: "17%", prob: { bigPump: 0.11, smallPump: 0.23, chop: 0.40, dump: 0.26 } },
    { name: "TimeBank", ticker: "$TIME", narrative: "Trade time. Hour of work = 1 token. Local currency alternative.", mcap: "$7M", fdv: "$70M", unlock: "23%", prob: { bigPump: 0.13, smallPump: 0.22, chop: 0.37, dump: 0.28 } },
    { name: "DreamDAO", ticker: "$DREAM", narrative: "Fund weird projects. Community votes. High risk, high reward.", mcap: "$9M", fdv: "$90M", unlock: "20%", prob: { bigPump: 0.12, smallPump: 0.23, chop: 0.38, dump: 0.27 } }
];

// ========================================
// OUTCOME SCENARIOS
// ========================================

const outcomes = {
    bigPump: {
        title: "MASSIVE PUMP",
        type: "profit",
        multiplier: [2.5, 5.0],
        messages: [
            "Whale accumulation detected on-chain → Price exploded",
            "Surprise Binance listing announced → Parabolic move",
            "Major partnership revealed → Market went wild",
            "Influencer with 1M followers shilled → Volume skyrocketed",
            "Team buyback and burn → Chart went vertical",
            "Airdrop to holders announced → FOMO kicked in",
            "Integration with top protocol → Legitimacy confirmed"
        ]
    },
    smallPump: {
        title: "PROFITABLE",
        type: "profit",
        multiplier: [1.2, 2.0],
        messages: [
            "Steady accumulation throughout session → Green candles",
            "Technical resistance broken → Momentum building",
            "Positive community sentiment → Organic growth",
            "Small CEX listing → Volume increase",
            "Development milestone reached → Trust gained",
            "Minor influencer coverage → New buyers entering"
        ]
    },
    chop: {
        title: "SIDEWAYS",
        type: "neutral",
        multiplier: [0.85, 1.15],
        messages: [
            "Low volume → Consolidation phase",
            "Mixed market signals → No clear direction",
            "Took small loss on gas fees → Essentially breakeven",
            "Paper hands vs diamond hands stalemate",
            "Waiting for catalyst → Range-bound trading",
            "Market indecision → Bots trading back and forth"
        ]
    },
    dump: {
        title: "REKT",
        type: "loss",
        multiplier: [0.1, 0.7],
        messages: [
            "Team dumped entire allocation → Classic rug pull",
            "Whale sold 20% of supply → Cascading liquidations",
            "Smart contract exploit discovered → Emergency exit",
            "Paid influencer dumped on followers → Coordinated exit",
            "Token unlock event → Supply shock crashed price",
            "Liquidity pulled from DEX → Honeypot confirmed",
            "Anonymous dev disappeared → TG/Discord deleted",
            "Audit revealed critical flaw → Panic selling",
            "Competitor launched superior product → Narrative dead",
            "Regulatory investigation announced → Fear maxed out"
        ]
    }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatMoney(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatPercent(value) {
    const sign = value >= 0 ? '+' : '';
    return sign + value.toFixed(1) + '%';
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getTimestamp() {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
}

// ========================================
// TOKEN SELECTION
// ========================================

function getRandomToken() {
    // Filter out already used tokens
    const availableTokens = tokenDatabase.filter(
        token => !gameState.usedTokens.includes(token.ticker)
    );
    
    // If all tokens used, reset the pool
    if (availableTokens.length === 0) {
        gameState.usedTokens = [];
        return getRandomItem(tokenDatabase);
    }
    
    const selected = getRandomItem(availableTokens);
    gameState.usedTokens.push(selected.ticker);
    return selected;
}

// ========================================
// GAME LOGIC
// ========================================

function determineOutcome(token) {
    const rand = Math.random();
    const p = token.prob;
    
    if (rand < p.bigPump) {
        return 'bigPump';
    } else if (rand < p.bigPump + p.smallPump) {
        return 'smallPump';
    } else if (rand < p.bigPump + p.smallPump + p.chop) {
        return 'chop';
    } else {
        return 'dump';
    }
}

function executeTrade(percentage) {
    if (gameState.portfolio <= 0) return;
    
    const allocation = gameState.portfolio * (percentage / 100);
    const outcomeKey = determineOutcome(gameState.currentToken);
    const outcome = outcomes[outcomeKey];
    
    // Calculate results
    const multiplier = getRandomInRange(outcome.multiplier[0], outcome.multiplier[1]);
    const result = allocation * multiplier;
    const pnl = result - allocation;
    
    // Update portfolio
    gameState.portfolio = gameState.portfolio - allocation + result;
    gameState.trades++;
    
    if (pnl > 0) {
        gameState.wins++;
    } else if (pnl < 0) {
        gameState.losses++;
    }
    
    // Add to history
    gameState.history.push(gameState.portfolio);
    
    // Log the trade
    logTrade(allocation, result, pnl, outcome, outcomeKey);
    
    // Update display
    updateStats();
    updateChart();
    
    // Check game over
    if (gameState.portfolio <= 0) {
        setTimeout(() => endGame("Portfolio depleted. The market has humbled you."), 1000);
    } else if (gameState.round >= gameState.maxRounds) {
        setTimeout(() => endGame("Maximum rounds reached. Session complete."), 1000);
    } else {
        // Next round
        setTimeout(nextRound, 1500);
    }
}

function skipToken() {
    logMessage("Skipped opportunity. Capital preserved.", "system");
    setTimeout(nextRound, 800);
}

function nextRound() {
    gameState.round++;
    gameState.currentToken = getRandomToken();
    displayToken(gameState.currentToken);
    updateStats();
    
    // Log new round
    logMessage(`Round ${gameState.round}: ${gameState.currentToken.name} (${gameState.currentToken.ticker})`, "system");
}

// ========================================
// DISPLAY FUNCTIONS
// ========================================

function displayToken(token) {
    document.getElementById('token-name').textContent = token.name;
    document.getElementById('token-ticker').textContent = token.ticker;
    document.getElementById('token-narrative').textContent = token.narrative;
    document.getElementById('token-mcap').textContent = token.mcap;
    document.getElementById('token-fdv').textContent = token.fdv;
    document.getElementById('token-unlock').textContent = token.unlock;
}

function updateStats() {
    // Portfolio value
    document.getElementById('balance-value').textContent = formatMoney(gameState.portfolio);
    
    // P&L
    const pnl = gameState.portfolio - gameState.initialPortfolio;
    const pnlElement = document.getElementById('pnl-value');
    pnlElement.textContent = formatMoney(pnl);
    pnlElement.className = 'stat-value';
    if (pnl > 0) pnlElement.classList.add('green');
    if (pnl < 0) pnlElement.classList.add('red');
    
    // Return %
    const returnPct = ((gameState.portfolio / gameState.initialPortfolio - 1) * 100);
    const returnElement = document.getElementById('return-value');
    returnElement.textContent = formatPercent(returnPct);
    returnElement.className = 'stat-value';
    if (returnPct > 0) returnElement.classList.add('green');
    if (returnPct < 0) returnElement.classList.add('red');
    
    // Round
    document.getElementById('round-badge').textContent = `ROUND ${gameState.round}`;
    
    // Trades
    document.getElementById('trades-count').textContent = gameState.trades;
    document.getElementById('wins-count').textContent = gameState.wins;
    document.getElementById('losses-count').textContent = gameState.losses;
}

function updateChart() {
    const chartContainer = document.getElementById('portfolio-chart');
    chartContainer.innerHTML = '';
    
    const maxValue = Math.max(...gameState.history);
    const minValue = Math.min(...gameState.history);
    const range = maxValue - minValue || 1;
    
    // Show last 20 data points max
    const dataToShow = gameState.history.slice(-20);
    
    dataToShow.forEach(value => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const height = ((value - minValue) / range) * 90 + 10; // 10-100% range
        bar.style.height = height + '%';
        
        // Color based on performance
        if (value > gameState.initialPortfolio) {
            bar.style.background = 'linear-gradient(to top, #238636, #3fb950)';
        } else if (value < gameState.initialPortfolio) {
            bar.style.background = 'linear-gradient(to top, #da3633, #f85149)';
        }
        
        chartContainer.appendChild(bar);
    });
}

function logTrade(allocation, result, pnl, outcome, outcomeKey) {
    const message = getRandomItem(outcome.messages);
    const type = outcome.type === 'profit' ? 'profit' : outcome.type === 'loss' ? 'loss' : 'trade';
    
    const details = `${outcome.title}: ${formatMoney(allocation)} → ${formatMoney(result)} (${formatMoney(pnl)})`;
    logMessage(details, type);
    logMessage(message, type);
}

function logMessage(message, type = 'system') {
    const logContainer = document.getElementById('log-container');
    
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const timestamp = document.createElement('span');
    timestamp.className = 'log-timestamp';
    timestamp.textContent = getTimestamp();
    
    const msg = document.createElement('span');
    msg.className = 'log-message';
    msg.textContent = message;
    
    entry.appendChild(timestamp);
    entry.appendChild(msg);
    
    logContainer.insertBefore(entry, logContainer.firstChild);
    
    // Limit log entries
    while (logContainer.children.length > 30) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

function endGame(message) {
    const overlay = document.getElementById('game-over-overlay');
    overlay.classList.remove('hidden');
    
    document.getElementById('game-over-message').textContent = message;
    document.getElementById('final-balance').textContent = formatMoney(gameState.portfolio);
    
    const finalPnl = gameState.portfolio - gameState.initialPortfolio;
    const pnlElement = document.getElementById('final-pnl');
    pnlElement.textContent = formatMoney(finalPnl);
    pnlElement.style.color = finalPnl >= 0 ? '#3fb950' : '#f85149';
    
    document.getElementById('final-rounds').textContent = gameState.round;
    
    const winRate = gameState.trades > 0 ? (gameState.wins / gameState.trades * 100).toFixed(1) : 0;
    document.getElementById('final-winrate').textContent = winRate + '%';
}

function restartGame() {
    // Reset state
    gameState.portfolio = 10000;
    gameState.initialPortfolio = 10000;
    gameState.round = 1;
    gameState.trades = 0;
    gameState.wins = 0;
    gameState.losses = 0;
    gameState.history = [10000];
    gameState.usedTokens = [];
    
    // Clear log
    const logContainer = document.getElementById('log-container');
    logContainer.innerHTML = '<div class="log-entry system"><span class="log-timestamp">00:00:00</span><span class="log-message">System initialized. Starting capital: $10,000</span></div>';
    
    // Hide overlay
    document.getElementById('game-over-overlay').classList.add('hidden');
    
    // Start new game
    gameState.currentToken = getRandomToken();
    displayToken(gameState.currentToken);
    updateStats();
    updateChart();
    
    logMessage("Session restarted", "system");
}

// ========================================
// EVENT LISTENERS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Allocation buttons
    const allocButtons = document.querySelectorAll('.alloc-btn');
    allocButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const percent = parseInt(btn.dataset.percent);
            executeTrade(percent);
        });
        
        // Preview on hover
        btn.addEventListener('mouseenter', () => {
            const percent = parseInt(btn.dataset.percent);
            const amount = gameState.portfolio * (percent / 100);
            document.getElementById('alloc-preview').textContent = 
                `Allocate ${formatMoney(amount)} (${percent}% of portfolio)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            document.getElementById('alloc-preview').textContent = 'Select allocation amount';
        });
    });
    
    // Skip button
    document.getElementById('refresh-token').addEventListener('click', () => {
        skipToken();
    });
    
    // Restart button
    document.getElementById('restart-btn').addEventListener('click', () => {
        restartGame();
    });
    
    // Initialize game
    gameState.currentToken = getRandomToken();
    displayToken(gameState.currentToken);
    updateStats();
    updateChart();
});
