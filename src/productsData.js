import RedSnap from "../Products/RedSnapback.jpg"
import BlackSnap from "../Products/BlackSnapback.jpg"
import BlondeSnap from "../Products/BlondeSnapbackpic.jpg" 
import Beanie from "../Products/Beanie.jpg"
import BeanieM from "../Products/BeanieModel.jpg"
import BeanieM2 from "../Products/BeanieModel (2).jpg"
import BlackWaveCap from "../Products/BlackWaveCap.jpg"
import CamoWave from "../Products/CamoSkullCap.jpg"
import PinkWave from "../Products/PinkSkullCap.jpg"
import GrayWave from "../Products/GraySkullCap.jpg"
import OGSkullCap from "../Products/OGSkullcap.jpg"
import OGSkullCapPink from "../Products/SkullCappink.jpg"
import BlueWave from "../Products/BlueSkullCap.jpg"

export const snapbacks = [
    {
        id: "S1",
        name: "Black SnapBack",
        description: "SnapBack Hat.",
        price: 8999.00,
        image: BlackSnap,
        quantity: 15,
        category: "snapback"
    },
    {
        id: "S2",
        name: "Red SnapBack",
        description: "SnapBack Hat.",
        price: 8999.00,
        image: RedSnap,
        quantity: 12,
        category: "snapback"
    },
    {
        id: "S3",
        name: "Blonde SnapBack",
        description: "SnapBack Hat.",
        price: 8999.00,
        image: BlondeSnap,
        quantity: 10,
        category: "snapback"
    }
];

export const beanies = [
    {
        id: "B1",
        name: "Black Beanie",
        description: "Don't Think, Jump Editions.",
        price: 8999.00,
        image: Beanie,
        quantity: 20,
        category: "beanie"
    },
    {
        id: "B2",
        name: "Beanie",
        description: "S....",
        price: 8999.00,
        image: BeanieM,
        quantity: 8,
        category: "beanie"
    },
    {
        id: "B3",
        name: "Blonde SnapBack",
        description: "A....",
        price: 8999.00,
        image: BeanieM2,
        quantity: 5,
        category: "beanie"
    }
];

export const waveCaps = [
    {
        id: "W1",
        name: "Black Wave Cap",
        description: "Wave Cap Hat.",
        image: BlackWaveCap,
        price: 6999.00,
        quantity: 25,
        category: "wavecap"
    },
    {
        id: "W2",
        name: "Camo Wave Cap",
        description: "Wave Cap .",
        image: CamoWave,
        price: 6999.00,
        quantity: 18,
        category: "wavecap"
    },
    {
        id: "W3",
        name: "Pink Wave Cap",
        description: "Wave Cap .",
        image: PinkWave,
        price: 6999.00,
        quantity: 14,
        category: "wavecap"
    },
    {
        id: "W4",
        name: "Gray Wave Cap",
        description: "Wave Cap .",
        image: GrayWave,
        price: 6999.00,
        quantity: 10,
        category: "wavecap"
    },
    {
        id: "W5",
        name: "OG Wave Cap",
        description: "Limited Edition Wave Cap .",
        image: OGSkullCap,
        price: 6999.00,
        quantity: 7,
        category: "wavecap"
    },
    {
        id: "W6",
        name: "OG Wave Cap (Pink)",
        description: "Limited Edition Wave Cap .",
        image: OGSkullCapPink,
        price: 6999.00,
        quantity: 6,
        category: "wavecap"
    }
];

export const allProducts = [...snapbacks, ...beanies, ...waveCaps];

export const featuredProducts = [
    {
        id: "B1",
        productName: "BEANIE",
        productImg: Beanie,
        productDesc: "--Black--",
    },
    {
        id: "W1",
        productName: "WAVE CAP",
        productImg: BlackWaveCap,
        productDesc: "--Black--",
    },
    {
        id: "S1",
        productName: "SNAPBACK",
        productImg: BlackSnap,
        productDesc: "--Black--",
    }
];
