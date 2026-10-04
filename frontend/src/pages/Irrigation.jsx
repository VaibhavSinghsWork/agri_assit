import React, { useState } from "react";
import {
  Droplets,
  Sprout,
  CheckCircle2,
  X,
  ChevronRight,
  FileText,
  ExternalLink,
  Tractor,
  Waves,
  Sun,
  Landmark,
  ShieldCheck,
  Info,
  ArrowDown,
  Mountain,
  ClipboardList,
  IndianRupee,
} from "lucide-react";

import "./Irrigation.css";

/* =========================================================
   IRRIGATION METHODS
========================================================= */

const IRRIGATION_TYPES = [
  {
    id: "drip",
    title: "Drip Irrigation",
    badge: "High Water Efficiency",
    image: "/images/irrigation/drip.jpg",

    shortDesc:
      "Water is supplied slowly and directly near the root zone through pipes and emitters.",

    suitableCrops: [
      "Sugarcane",
      "Cotton",
      "Banana",
      "Tomato",
      "Chilli",
      "Grapes",
      "Pomegranate",
      "Vegetables",
    ],

    idealFor:
      "Orchards, vegetables and row crops where water needs to be supplied close to individual plants.",

    advantages: [
      "Reduces unnecessary wetting of the entire field.",
      "Useful where water availability is limited.",
      "Can be combined with fertigation.",
      "Helps provide controlled water near the root zone.",
    ],

    setupSteps: [
      "Assess the farm water source and crop spacing.",
      "Connect the water source to a suitable filtration system.",
      "Lay the main and sub-main pipelines.",
      "Place drip laterals along the crop rows.",
      "Install emitters according to crop spacing.",
      "Regularly check filters, pipes and emitters for blockage.",
    ],
  },

  {
    id: "sprinkler",
    title: "Sprinkler Irrigation",
    badge: "Useful for Uneven Land",
    image: "/images/irrigation/sprinkler.jpg",

    shortDesc:
      "Water is sprayed through nozzles and distributed over the field in a rain-like pattern.",

    suitableCrops: [
      "Wheat",
      "Mustard",
      "Groundnut",
      "Pulses",
      "Gram",
      "Soybean",
      "Vegetables",
      "Fodder",
    ],

    idealFor:
      "Light soils and fields where land levelling is difficult or expensive.",

    advantages: [
      "Can be used on uneven or gently sloping land.",
      "Provides more controlled water application.",
      "Portable systems can be shifted between field sections.",
      "Useful for several field and fodder crops.",
    ],

    setupSteps: [
      "Connect the pump to the main pipeline.",
      "Lay portable pipes across the selected field section.",
      "Install riser pipes and sprinkler heads.",
      "Maintain suitable operating pressure.",
      "Irrigate one field section at a time.",
      "Move the sprinkler set when adequate irrigation is completed.",
    ],
  },

  {
    id: "solar",
    title: "Solar-Powered Irrigation",
    badge: "Uses Solar Energy",
    image: "/images/irrigation/solar-pump.jpg",

    shortDesc:
      "Solar pumps can supply water for agricultural irrigation where a suitable water source and solar pumping system are available.",

    suitableCrops: [
      "Vegetables",
      "Orchards",
      "Cotton",
      "Spices",
      "Flowers",
      "Field Crops",
    ],

    idealFor:
      "Farms where reliable electricity is difficult to obtain and a suitable groundwater or surface-water source exists.",

    advantages: [
      "Uses solar energy for pumping.",
      "Can reduce dependence on diesel pumping.",
      "Can be combined with drip or sprinkler systems.",
      "Useful in areas with suitable solar radiation.",
    ],

    setupSteps: [
      "Assess the water source and required pumping head.",
      "Estimate the farm's irrigation water requirement.",
      "Select an appropriately sized solar pumping system.",
      "Install the solar panels and pump through the approved process.",
      "Connect the pump to the irrigation system.",
      "Maintain panels, pump and filters regularly.",
    ],
  },

  {
    id: "subsurface",
    title: "Sub-Surface Drip",
    badge: "Root-Zone Irrigation",
    image: "/images/irrigation/subsurface-drip.jpg",

    shortDesc:
      "Drip lines are installed below the soil surface so that water reaches the crop root zone.",

    suitableCrops: [
      "Sugarcane",
      "Maize",
      "Cotton",
      "Fodder",
      "Permanent Crops",
    ],

    idealFor:
      "Suitable fields where crop pattern, soil conditions and farm management make buried drip lines practical.",

    advantages: [
      "Supplies water close to the root zone.",
      "Keeps much of the irrigation network below the soil surface.",
      "Can reduce surface wetting.",
      "Can be useful for suitable permanent or row crops.",
    ],

    setupSteps: [
      "Plan crop rows and drip-line spacing.",
      "Prepare the field before installation.",
      "Install buried drip lines at the recommended depth.",
      "Install filtration and pressure-control equipment.",
      "Test the system before regular operation.",
      "Regularly inspect and flush the system.",
    ],
  },

  {
    id: "furrow",
    title: "Furrow & Ridge Irrigation",
    badge: "Simple Field Method",
    image: "/images/irrigation/furrow.jpg",

    shortDesc:
      "Water flows through furrows between raised crop beds instead of covering the entire field surface.",

    suitableCrops: [
      "Potato",
      "Onion",
      "Maize",
      "Sugarcane",
      "Cotton",
      "Groundnut",
      "Vegetables",
    ],

    idealFor:
      "Row crops on fields with suitable slope and soil infiltration characteristics.",

    advantages: [
      "Simple method using field channels.",
      "Can reduce the area directly flooded.",
      "Can be implemented with ordinary farm equipment.",
      "Useful for many row crops.",
    ],

    setupSteps: [
      "Prepare the field with suitable rows and furrows.",
      "Create ridges according to the crop spacing.",
      "Bring water to the head of the furrows.",
      "Control the flow to avoid erosion.",
      "Allow sufficient infiltration into the root zone.",
      "Stop irrigation before excessive runoff occurs.",
    ],
  },

  {
    id: "pivot",
    title: "Center Pivot Irrigation",
    badge: "Large Farm Application",
    image: "/images/irrigation/center-pivot.jpg",

    shortDesc:
      "A mechanised irrigation system rotates around a central point and distributes water over a large field.",

    suitableCrops: [
      "Wheat",
      "Maize",
      "Potato",
      "Soybean",
      "Groundnut",
      "Fodder",
    ],

    idealFor:
      "Large, relatively uniform farms where the investment and operating requirements are justified.",

    advantages: [
      "Can automate irrigation over large areas.",
      "Provides controlled water application.",
      "Reduces the need to move portable irrigation systems.",
      "Can be combined with modern farm management systems.",
    ],

    setupSteps: [
      "Evaluate field size, shape and water requirement.",
      "Prepare the central pivot point.",
      "Install the pivot structure and irrigation spans.",
      "Connect the water supply and control system.",
      "Test the system before operation.",
      "Operate according to crop water requirement and manufacturer guidance.",
    ],
  },
];

/* =========================================================
   GOVERNMENT SCHEMES
========================================================= */

const SCHEMES = [
  {
    id: "pdmc",
    code: "PDMC",
    title: "Per Drop More Crop",
    icon: <Droplets size={28} />,
    color: "green",

    aim:
      "Promotes micro-irrigation such as drip and sprinkler systems to improve water-use efficiency and help farmers get more crop per drop.",

    benefit:
      "For Maharashtra's current MahaDBT PDMC page, assistance is listed as 55% for small and marginal farmers and 45% for other farmers, subject to the applicable scheme conditions and limits.",

    eligibility: [
      "Farmer should have Aadhaar.",
      "Maharashtra's current scheme page lists 7/12 and 8-A land records.",
      "A recent electricity bill is required where applicable for the permanent electrical connection condition.",
      "Other State-specific eligibility conditions may apply.",
    ],

    documents: [
      "Aadhaar Card",
      "7/12 Certificate",
      "8-A Certificate",
      "Recent Electricity Bill where applicable",
      "Pre-Sanction Letter",
      "Purchase Invoice after approved purchase",
    ],

    steps: [
      "Open the official State Agriculture/DBT portal.",
      "Register or log in as a farmer.",
      "Complete your farmer, Aadhaar and land details.",
      "Select PMKSY – Per Drop More Crop / Micro-Irrigation.",
      "Choose the applicable irrigation system such as drip or sprinkler.",
      "Enter the required crop and land information.",
      "Upload the required documents.",
      "Submit the application.",
      "Wait for verification and pre-sanction.",
      "After pre-sanction, purchase the micro-irrigation system through the prescribed/authorized process.",
      "Install the system on your farm.",
      "Upload the purchase invoice and other required documents within the prescribed period.",
      "Track the application and subsidy status through the State portal.",
    ],

    apply:
      "For Maharashtra, farmers can use the MahaDBT Farmer Portal. In other States, use the State Agriculture/Horticulture Department or its designated DBT portal.",

    links: [
      {
        name: "MahaDBT Farmer Portal",
        url: "https://mahadbt.maharashtra.gov.in/",
      },
      {
        name: "PMKSY Official Website",
        url: "https://pmksy.gov.in/",
      },
    ],

    note:
      "The exact documents, application window, selection method and beneficiary conditions can vary by State/UT. Verify the current State instructions before purchasing equipment.",
  },

  {
    id: "kusum",
    code: "PM-KUSUM",
    title: "PM-KUSUM",
    icon: <Sun size={28} />,
    color: "yellow",

    aim:
      "Promotes solar energy applications in agriculture, including standalone solar agricultural pumps and solarisation of eligible grid-connected agricultural pumps.",

    benefit:
      "Financial assistance and farmer contribution depend on the applicable PM-KUSUM component, State/UT implementation arrangements and current guidelines.",

    eligibility: [
      "Eligibility depends on the PM-KUSUM component and State implementation.",
      "Component B covers eligible beneficiaries for standalone solar agricultural pumps.",
      "Component C covers eligible grid-connected agricultural pumps and their solarisation.",
      "State-level conditions and available allocation determine how farmers can apply.",
    ],

    documents: [
      "Aadhaar / identity proof",
      "Land documents",
      "Bank details",
      "Agricultural pump details where applicable",
      "Farmer and land information required by the State",
      "Other documents specified by the State Implementing Agency",
    ],

    steps: [
      "Open the official PM-KUSUM National Portal.",
      "Find the implementing agency for your State.",
      "Check whether applications are currently open in your State.",
      "Identify the relevant component, such as Component B for standalone solar agricultural pumps.",
      "Open the application portal of the designated State Implementing Agency.",
      "Register and enter farmer, land and pump details.",
      "Upload the required documents.",
      "Complete identity/Aadhaar verification where required.",
      "Pay the farmer contribution if applicable.",
      "Select an approved/empanelled vendor where required.",
      "Wait for State-level verification and approval.",
      "After approval, the solar pump/system is installed according to the scheme procedure.",
      "Complete any required inspection, documentation or commissioning process.",
    ],

    apply:
      "Apply through the designated State Implementing Agency for the relevant PM-KUSUM component.",

    links: [
      {
        name: "PM-KUSUM National Portal",
        url: "https://pmkusum.mnre.gov.in/",
      },
      {
        name: "MNRE Official Website",
        url: "https://mnre.gov.in/",
      },
    ],

    note:
      "Use only official government portals. The PM-KUSUM National Portal warns farmers about fraudulent websites and applications asking for registration fees or pump payments.",
  },

  {
    id: "mif",
    code: "MIF",
    title: "Micro Irrigation Fund",
    icon: <Landmark size={28} />,
    color: "blue",

    aim:
      "The Micro Irrigation Fund helps participating State Governments mobilise additional resources for expanding micro-irrigation and encouraging adoption beyond the normal PMKSY-PDMC provisions.",

    benefit:
      "MIF primarily provides financing to participating State Governments. It is not a direct individual-farmer subsidy application portal.",

    eligibility: [
      "The fund mechanism primarily operates through participating State Governments.",
      "Farmers may benefit through State-level micro-irrigation programmes supported by the fund.",
      "Individual farmer eligibility depends on the specific State programme.",
    ],

    documents: [
      "Farmer ID / Aadhaar",
      "Land records",
      "Bank details",
      "Crop and irrigation details",
      "Other documents specified by the State programme",
    ],

    steps: [
      "Contact your State Agriculture/Horticulture Department.",
      "Ask whether your State has an MIF-supported micro-irrigation programme.",
      "Check whether additional or top-up support is available in your area.",
      "Find the State's designated application portal or department office.",
      "Register or submit the application through the State programme.",
      "Submit the required farmer and land documents.",
      "Select the applicable micro-irrigation component.",
      "Complete State-level verification.",
      "Follow the prescribed purchase and installation process.",
      "Submit invoices or installation documents if required.",
      "Receive the applicable benefit according to the State programme.",
    ],

    apply:
      "Farmers should approach their State Agriculture/Horticulture Department or the relevant State micro-irrigation programme rather than applying directly to NABARD for MIF.",

    links: [
      {
        name: "NABARD Official Website",
        url: "https://www.nabard.org/",
      },
      {
        name: "MahaDBT Farmer Portal",
        url: "https://mahadbt.maharashtra.gov.in/",
      },
    ],

    note:
      "MIF is a financing mechanism for State Governments. The actual farmer application route depends on the micro-irrigation programme implemented by the State.",
  },
];

/* =========================================================
   WATER HARVESTING
========================================================= */

const HARVESTING_TECHNIQUES = [
  {
    id: "farm-pond",
    title: "Farm Pond",
    subtitle: "Store Rainwater for Later Use",
    icon: <Waves size={28} />,
    image: "/images/irrigation/farm-pond.jpg",

    description:
      "A farm pond can collect rainwater and field runoff during the monsoon. Stored water can later be used for supplemental irrigation where technically and legally appropriate.",

    benefits: [
      "Stores excess monsoon runoff.",
      "Provides supplemental irrigation during dry periods.",
      "Reduces uncontrolled runoff from the farm.",
    ],

    steps: [
      "Select a suitable low-lying location after studying the natural drainage of the farm.",
      "Check soil suitability and expected water retention.",
      "Provide an inlet with a suitable silt-trapping arrangement.",
      "Use lining where the soil cannot retain water adequately.",
      "Provide a safe overflow arrangement for heavy rainfall.",
      "Keep the pond free from excessive silt and vegetation.",
    ],
  },

  {
    id: "recharge-pit",
    title: "Recharge Pit",
    subtitle: "Help Rainwater Enter the Ground",
    icon: <ArrowDown size={28} />,
    image: "/images/irrigation/recharge-pit.jpg",

    description:
      "A recharge pit can receive relatively clean rainwater after removing silt and debris, allowing water to infiltrate into the surrounding ground where soil and groundwater conditions are suitable.",

    benefits: [
      "Can support local groundwater recharge.",
      "Useful around suitable farm buildings and runoff collection points.",
      "Can be relatively simple to construct.",
    ],

    steps: [
      "Identify an appropriate recharge location.",
      "Keep dirty or contaminated water away from the recharge structure.",
      "Install a silt trap or filtration arrangement before the pit.",
      "Fill the recharge structure with suitable filter material.",
      "Provide a safe inlet for rainwater.",
      "Clean accumulated silt periodically.",
    ],
  },

  {
    id: "check-dam",
    title: "Check Dam / Nala Bund",
    subtitle: "Slow Seasonal Runoff",
    icon: <Mountain size={28} />,
    image: "/images/irrigation/check-dam.jpg",

    description:
      "Small structures across suitable seasonal drainage channels can slow runoff, reduce erosion and encourage infiltration. They require proper site assessment and technical design.",

    benefits: [
      "Slows the movement of runoff.",
      "Can encourage groundwater recharge.",
      "Can help reduce soil erosion.",
    ],

    steps: [
      "Identify a suitable seasonal drainage channel.",
      "Assess the banks, soil, slope and expected peak flow.",
      "Take technical guidance before constructing a permanent structure.",
      "Construct the structure according to the approved design.",
      "Provide a safe spillway for excess water.",
      "Inspect the structure before and during the monsoon.",
    ],
  },

  {
    id: "contour",
    title: "Contour Bunding",
    subtitle: "Conserve Rainwater on Sloping Land",
    icon: <Tractor size={28} />,
    image: "/images/irrigation/contour-bunding.jpg",

    description:
      "Contour bunding and related contour-based measures can slow rainwater moving down a slope, helping reduce soil erosion and retain moisture in the field.",

    benefits: [
      "Reduces runoff velocity.",
      "Helps control soil erosion.",
      "Retains moisture on suitable sloping agricultural land.",
    ],

    steps: [
      "Determine the contour lines of the field.",
      "Construct bunds along suitable contours.",
      "Avoid blocking natural drainage without providing safe outlets.",
      "Strengthen bunds with suitable vegetation where appropriate.",
      "Inspect bunds after heavy rainfall.",
      "Repair damaged sections before the next monsoon.",
    ],
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Irrigation() {
  const [selectedIrrigation, setSelectedIrrigation] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [selectedHarvesting, setSelectedHarvesting] = useState(null);

  const closeAllModals = () => {
    setSelectedIrrigation(null);
    setSelectedScheme(null);
    setSelectedHarvesting(null);
  };

  return (
    <div className="irrigation-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="irrigation-hero">

        <div className="hero-overlay"></div>

        <div className="irrigation-container hero-content">

          <div className="hero-text">

            <div className="hero-badge">
              <Droplets size={16} />
              Irrigation Guide for Indian Farmers
            </div>

            <h1>
              Use Every Drop
              <span>More Efficiently</span>
            </h1>

            <p>
              Learn about irrigation methods, government support
              and practical rainwater harvesting techniques to
              manage water more efficiently on your farm.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() =>
                  document
                    .getElementById("irrigation-types")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Irrigation Methods
                <ChevronRight size={18} />
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  document
                    .getElementById("government-schemes")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Government Support
              </button>

            </div>
          </div>

          <div className="hero-image-wrapper">

            <img
              src="/images/irrigation/irrigation-hero.jpg"
              alt="Agricultural field irrigation"
              className="hero-image"
            />

            {/* <div className="hero-info-card">

              <div className="hero-info-icon">
                <Droplets size={25} />
              </div>

              {/* <div>
                <h3>Better Water Management</h3>

                <p>
                  Choose an irrigation method according to
                  your crop, soil, water source and field.
                </p>
              </div> */}

            {/* </div>  */}
            

          </div>

        </div>
      </section>

      {/* =====================================================
          WHY EFFECTIVE IRRIGATION
      ===================================================== */}

      <section className="why-section">

        <div className="irrigation-container">

          <div className="section-heading">

            <span className="section-label">
              Why Effective Irrigation Matters
            </span>

            <h2>
              Irrigation Is More Than Just Giving Water
            </h2>

            <p>
              The aim is to provide the right amount of water
              at the right time while reducing avoidable losses.
            </p>

          </div>

          <div className="why-grid">

            <div className="why-card green-card">
              <div className="why-icon">
                <Droplets />
              </div>

              <h3>Better Water Use</h3>

              <p>
                Efficient irrigation can help direct water
                where crops need it instead of unnecessarily
                wetting the entire field.
              </p>
            </div>

            <div className="why-card blue-card">
              <div className="why-icon">
                <Sprout />
              </div>

              <h3>Crop Growth</h3>

              <p>
                Crops need water at different stages.
                Timely irrigation is important for healthy
                crop growth.
              </p>
            </div>

            <div className="why-card yellow-card">
              <div className="why-icon">
                <Tractor />
              </div>

              <h3>Lower Wastage</h3>

              <p>
                Poorly managed irrigation can lead to
                runoff, evaporation and unnecessary pumping.
              </p>
            </div>

            <div className="why-card teal-card">
              <div className="why-icon">
                <ShieldCheck />
              </div>

              <h3>Water Security</h3>

              <p>
                Combining efficient irrigation with rainwater
                harvesting can improve preparedness for dry periods.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          IRRIGATION TYPES
      ===================================================== */}

      <section
        id="irrigation-types"
        className="methods-section"
      >

        <div className="irrigation-container">

          <div className="section-heading dark-heading">

            <span className="section-label dark-label">
              Choose According to Your Farm
            </span>

            <h2>Types of Irrigation</h2>

            <p>
              Select an irrigation method to understand
              suitable crops, advantages and implementation steps.
            </p>

          </div>

          <div className="methods-grid">

            {IRRIGATION_TYPES.map((method) => (

              <div
                className="method-card"
                key={method.id}
              >

                <div className="method-image-wrapper">

                  <img
                    src={method.image}
                    alt={method.title}
                    className="method-image"
                  />

                  <div className="method-image-overlay"></div>

                  <span className="method-badge">
                    {method.badge}
                  </span>

                </div>

                <div className="method-content">

                  <h3>{method.title}</h3>

                  <p>
                    {method.shortDesc}
                  </p>

                  <div className="crop-preview">

                    <span>Suitable for:</span>

                    <div className="crop-tags">

                      {method.suitableCrops
                        .slice(0, 4)
                        .map((crop) => (

                          <span key={crop}>
                            {crop}
                          </span>

                        ))}

                      {method.suitableCrops.length > 4 && (
                        <span>
                          + more
                        </span>
                      )}

                    </div>

                  </div>

                  <button
                    className="view-button"
                    onClick={() =>
                      setSelectedIrrigation(method)
                    }
                  >
                    View Details
                    <ChevronRight size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          IRRIGATION MODAL
      ===================================================== */}

      {selectedIrrigation && (

        <div
          className="modal-backdrop"
          onClick={closeAllModals}
        >

          <div
            className="modal-card large-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <h2>
                  {selectedIrrigation.title}
                </h2>

                <span className="modal-badge">
                  {selectedIrrigation.badge}
                </span>

              </div>

              <button
                className="close-button"
                onClick={closeAllModals}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <img
                src={selectedIrrigation.image}
                alt={selectedIrrigation.title}
                className="modal-image"
              />

              <div className="info-block">

                <h3>
                  <Info size={19} />
                  What is it?
                </h3>

                <p>
                  {selectedIrrigation.shortDesc}
                </p>

              </div>

              <div className="highlight-box">

                <h3>Where is it suitable?</h3>

                <p>
                  {selectedIrrigation.idealFor}
                </p>

              </div>

              <div className="info-block">

                <h3>
                  <Sprout size={19} />
                  Suitable Crops
                </h3>

                <div className="full-crop-tags">

                  {selectedIrrigation.suitableCrops.map(
                    (crop) => (
                      <span key={crop}>
                        {crop}
                      </span>
                    )
                  )}

                </div>

              </div>

              <div className="info-block">

                <h3>
                  Main Advantages
                </h3>

                <div className="check-list">

                  {selectedIrrigation.advantages.map(
                    (advantage) => (

                      <div
                        key={advantage}
                        className="check-item"
                      >
                        <CheckCircle2 size={19} />
                        <span>{advantage}</span>
                      </div>

                    )
                  )}

                </div>

              </div>

              <div className="info-block">

                <h3>
                  <FileText size={19} />
                  How to Implement
                </h3>

                <ol className="numbered-list">

                  {selectedIrrigation.setupSteps.map(
                    (step, index) => (

                      <li key={step}>

                        <span className="number-circle">
                          {index + 1}
                        </span>

                        <span>{step}</span>

                      </li>

                    )
                  )}

                </ol>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="dark-button"
                onClick={closeAllModals}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          GOVERNMENT SCHEMES
      ===================================================== */}

      <section
        id="government-schemes"
        className="schemes-section"
      >

        <div className="irrigation-container">

          <div className="section-heading">

            <span className="section-label">
              Government Support
            </span>

            <h2>
              Schemes Farmers Should Know
            </h2>

            <p>
              Understand the purpose, eligibility and
              application process of important irrigation-related
              government programmes.
            </p>

          </div>

          <div className="schemes-grid">

            {SCHEMES.map((scheme) => (

              <div
                className={`scheme-card ${scheme.color}`}
                key={scheme.id}
              >

                <div className="scheme-top">

                  <div className="scheme-icon">
                    {scheme.icon}
                  </div>

                  <div>

                    <span className="scheme-code">
                      {scheme.code}
                    </span>

                    <h3>
                      {scheme.title}
                    </h3>

                  </div>

                </div>

                <div className="scheme-preview">

                  <div>
                    <h4>Main Aim</h4>

                    <p>
                      {scheme.aim}
                    </p>
                  </div>

                  <div>
                    <h4>Where to Apply</h4>

                    <p>
                      {scheme.apply}
                    </p>
                  </div>

                </div>

                <button
                  className="scheme-detail-button"
                  onClick={() =>
                    setSelectedScheme(scheme)
                  }
                >
                  View Application Process
                  <ChevronRight size={17} />
                </button>

              </div>

            ))}

          </div>

          <div className="scheme-warning">

            <Info size={20} />

            <div>

              <h3>
                Always verify before applying
              </h3>

              <p>
                Scheme rules, documents, application windows
                and State-level implementation can change.
                Use the official government portal before
                submitting documents or making any payment.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          GOVERNMENT SCHEME MODAL
      ===================================================== */}

      {selectedScheme && (

        <div
          className="modal-backdrop"
          onClick={closeAllModals}
        >

          <div
            className="modal-card scheme-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <span className="scheme-code">
                  {selectedScheme.code}
                </span>

                <h2>
                  {selectedScheme.title}
                </h2>

              </div>

              <button
                className="close-button"
                onClick={closeAllModals}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              {/* MAIN AIM */}

              <div className="scheme-detail-section">

                <h3>
                  <Landmark size={19} />
                  Main Aim
                </h3>

                <p>
                  {selectedScheme.aim}
                </p>

              </div>

              {/* BENEFIT */}

              <div className="scheme-benefit-box">

                <div className="benefit-title">
                  <IndianRupee size={19} />
                  Financial Support / Benefit
                </div>

                <p>
                  {selectedScheme.benefit}
                </p>

              </div>

              {/* ELIGIBILITY */}

              <div className="scheme-detail-section">

                <h3>
                  <ShieldCheck size={19} />
                  Who Can Benefit?
                </h3>

                <div className="check-list">

                  {selectedScheme.eligibility.map(
                    (item) => (

                      <div
                        className="check-item"
                        key={item}
                      >
                        <CheckCircle2 size={18} />
                        <span>{item}</span>
                      </div>

                    )
                  )}

                </div>

              </div>

              {/* DOCUMENTS */}

              <div className="scheme-detail-section">

                <h3>
                  <ClipboardList size={19} />
                  Documents You May Need
                </h3>

                <ul className="document-list">

                  {selectedScheme.documents.map(
                    (document) => (

                      <li key={document}>
                        <CheckCircle2 size={17} />
                        <span>{document}</span>
                      </li>

                    )
                  )}

                </ul>

              </div>

              {/* APPLICATION STEPS */}

              <div className="scheme-detail-section">

                <h3>
                  <FileText size={19} />
                  How to Apply — Step by Step
                </h3>

                <ol className="application-steps">

                  {selectedScheme.steps.map(
                    (step, index) => (

                      <li key={step}>

                        <span className="step-number">
                          {index + 1}
                        </span>

                        <span>{step}</span>

                      </li>

                    )
                  )}

                </ol>

              </div>

              {/* WHERE TO APPLY */}

              <div className="apply-box">

                <h3>
                  Where to Apply
                </h3>

                <p>
                  {selectedScheme.apply}
                </p>

              </div>

              {/* OFFICIAL LINKS */}

              <div className="scheme-detail-section">

                <h3>
                  <ExternalLink size={19} />
                  Official Links
                </h3>

                <div className="official-links">

                  {selectedScheme.links.map(
                    (link) => (

                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                        <ExternalLink size={16} />
                      </a>

                    )
                  )}

                </div>

              </div>

              {/* NOTE */}

              <div className="scheme-note">

                <Info size={18} />

                <p>
                  {selectedScheme.note}
                </p>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="dark-button"
                onClick={closeAllModals}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          WATER HARVESTING
      ===================================================== */}

      <section
        id="water-harvesting"
        className="harvesting-section"
      >

        <div className="irrigation-container">

          <div className="section-heading">

            <span className="section-label  blue-label">
              Rainwater & Groundwater
            </span>

            <h2>
              Harvest Rainwater on the Farm
            </h2>

            <p>
              Instead of allowing all monsoon runoff to leave
              the farm, suitable structures can store water,
              slow runoff and support groundwater recharge.
            </p>

          </div>

          <div className="harvesting-grid">

            {HARVESTING_TECHNIQUES.map((technique) => (

              <div
                className="harvesting-card"
                key={technique.id}
              >

                <div className="harvesting-image-wrapper">

                  <img
                    src={technique.image}
                    alt={technique.title}
                    className="harvesting-image"
                  />

                  <div className="harvesting-overlay"></div>

                  <div className="harvesting-title">

                    <div className="harvesting-icon">
                      {technique.icon}
                    </div>

                    <div>

                      <h3>
                        {technique.title}
                      </h3>

                      <p>
                        {technique.subtitle}
                      </p>

                    </div>

                  </div>

                </div>

                <div className="harvesting-content">

                  <p>
                    {technique.description}
                  </p>

                  <h4>
                    Key Benefits
                  </h4>

                  <div className="check-list">

                    {technique.benefits.map(
                      (benefit) => (

                        <div
                          className="check-item"
                          key={benefit}
                        >
                          <CheckCircle2 size={17} />
                          <span>{benefit}</span>
                        </div>

                      )
                    )}

                  </div>

                  <button
                    className="harvesting-button"
                    onClick={() =>
                      setSelectedHarvesting(technique)
                    }
                  >
                    See Construction Guide
                    <ChevronRight size={17} />
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="harvesting-warning">

            <Info size={20} />

            <div>

              <h3>
                Important before construction
              </h3>

              <p>
                The suitable harvesting or recharge structure
                depends on rainfall, slope, soil, drainage,
                groundwater conditions and local hydrogeology.
                Larger or permanent structures should be planned
                with guidance from the relevant technical authority.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          WATER HARVESTING MODAL
      ===================================================== */}

      {selectedHarvesting && (

        <div
          className="modal-backdrop"
          onClick={closeAllModals}
        >

          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>

                <h2>
                  {selectedHarvesting.title}
                </h2>

                <span className="modal-subtitle">
                  {selectedHarvesting.subtitle}
                </span>

              </div>

              <button
                className="close-button"
                onClick={closeAllModals}
              >
                <X size={20} />
              </button>

            </div>

            <div className="modal-body">

              <img
                src={selectedHarvesting.image}
                alt={selectedHarvesting.title}
                className="modal-image"
              />

              <div className="info-block">

                <p>
                  {selectedHarvesting.description}
                </p>

              </div>

              <div className="info-block">

                <h3>
                  How to Implement
                </h3>

                <ol className="numbered-list">

                  {selectedHarvesting.steps.map(
                    (step, index) => (

                      <li key={step}>

                        <span className="number-circle">
                          {index + 1}
                        </span>

                        <span>{step}</span>

                      </li>

                    )
                  )}

                </ol>

              </div>

            </div>

            <div className="modal-footer">

              <button
                className="dark-button"
                onClick={closeAllModals}
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}