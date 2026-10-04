import React, { useState } from "react";
import {
  Beaker,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FlaskConical,
  Leaf,
  MapPin,
  Sprout,
  X,
  Wheat,
  Recycle,
  IndianRupee,
  Info,
  ArrowRight,
  Mountain,
} from "lucide-react";

import "./Fertilizer.css";


// ============================================================
// NPK INFORMATION
// ============================================================

const NPK = [
  {
    symbol: "N",
    name: "Nitrogen",
    role: "Leaf and vegetative growth",
    description:
      "Nitrogen is important for healthy leaf growth and overall vegetative development of the crop.",
    signs:
      "Deficiency can cause poor growth and yellowing of older leaves.",
  },
  {
    symbol: "P",
    name: "Phosphorus",
    role: "Roots and crop development",
    description:
      "Phosphorus supports root development, energy transfer and important stages of crop growth.",
    signs:
      "Deficiency can affect root development and crop establishment.",
  },
  {
    symbol: "K",
    name: "Potassium",
    role: "Plant strength and water regulation",
    description:
      "Potassium helps plants regulate water and supports crop strength and stress tolerance.",
    signs:
      "Deficiency can lead to weak plants and symptoms along leaf margins.",
  },
];


// ============================================================
// SOIL TESTING STEPS
// ============================================================

const SOIL_STEPS = [
  {
    number: "01",
    title: "Select the field",
    description:
      "Identify the field whose soil condition you want to understand. If fields have clearly different soil or management conditions, treat them separately.",
  },
  {
    number: "02",
    title: "Choose sampling points",
    description:
      "Take representative samples from different parts of the field rather than relying on one random location.",
  },
  {
    number: "03",
    title: "Take the soil sample",
    description:
      "Under the Soil Health Card sampling procedure, soil is generally collected from about 15–20 cm depth using a V-shaped cut.",
  },
  {
    number: "04",
    title: "Mix the samples",
    description:
      "Samples from the selected points are mixed thoroughly so that the final sample represents the field.",
  },
  {
    number: "05",
    title: "Avoid abnormal areas",
    description:
      "Avoid shaded areas and locations that do not represent the normal field condition.",
  },
  {
    number: "06",
    title: "Send for testing",
    description:
      "The prepared sample is bagged, coded and transferred to an appropriate soil-testing laboratory.",
  },
];


// ============================================================
// BHARAT FERTILIZER INFORMATION
// ============================================================

const BHARAT_FERTILIZERS = [
  {
    name: "Bharat Urea",
    image: "/images/fertilizer/bharat-urea.jpg",
    nutrient: "Nitrogen",
    description:
      "Urea is a nitrogen fertilizer. Nitrogen supports vegetative growth and is one of the major nutrients required by crops.",
    use:
      "Use should be based on crop requirement and soil-test recommendations rather than applying more fertilizer simply to increase growth.",
  },
  {
    name: "Bharat DAP",
    image: "/images/fertilizer/bharat-dap.jpg",
    nutrient: "Nitrogen + Phosphorus",
    description:
      "DAP supplies nitrogen and phosphorus. Phosphorus is particularly important for root development and crop establishment.",
    use:
      "The appropriate fertilizer source and quantity should be selected according to the crop and soil nutrient status.",
  },
  {
    name: "Bharat MOP",
    image: "/images/fertilizer/bharat-mop.jpg",
    nutrient: "Potassium",
    description:
      "MOP is a potassium fertilizer. Potassium plays an important role in water regulation and plant strength.",
    use:
      "Use where potassium is required according to soil-test and crop recommendations.",
  },
  {
    name: "Bharat NPK",
    image: "/images/fertilizer/bharat-npk.jpg",
    nutrient: "N + P + K",
    description:
      "NPK fertilizers supply more than one major nutrient in a single fertilizer formulation.",
    use:
      "The exact formulation should match the nutrient requirement of the crop and the soil.",
  },
];


// ============================================================
// ORGANIC FERTILIZERS
// ============================================================

const ORGANIC_FERTILIZERS = [
  {
    name: "Farmyard Manure",
    image: "/images/fertilizer/fym.jpg",
    icon: "🌱",
    short:
      "Decomposed mixture of animal dung, urine, litter and other farm residues.",
    details:
      "Farmyard manure adds organic matter and nutrients to the soil. Proper decomposition is important before field application.",
    howTo:
      "Collect suitable livestock waste and bedding material, keep it under appropriate conditions for decomposition, maintain suitable moisture and allow it to mature before application.",
  },
  {
    name: "Compost",
    image: "/images/fertilizer/compost.jpg",
    icon: "♻️",
    short:
      "Decomposed organic materials converted into a stable soil amendment.",
    details:
      "Compost can be prepared from suitable crop residues and other biodegradable organic material.",
    howTo:
      "Collect organic material, arrange it in a composting system, maintain moisture and aeration, turn the material when required and allow it to decompose until mature.",
  },
  {
    name: "Vermicompost",
    image: "/images/fertilizer/vermicompost.jpg",
    icon: "🪱",
    short:
      "Organic material processed with the help of earthworms.",
    details:
      "Vermicomposting uses earthworms to convert suitable organic material into a nutrient-rich organic amendment.",
    howTo:
      "Prepare partially decomposed organic material, place it in a suitable shaded vermicomposting unit, introduce appropriate earthworms, maintain moisture and harvest mature vermicompost.",
  },
  {
    name: "Green Manure",
    image: "/images/fertilizer/green-manure.jpg",
    icon: "🌿",
    short:
      "Green plants grown and incorporated into soil to improve soil organic matter and nutrient cycling.",
    details:
      "Green manuring is an important practice for improving soil organic matter and nutrient management.",
    howTo:
      "Grow a suitable green-manure crop, allow sufficient biomass development and incorporate the crop into the soil at the appropriate stage before the next crop.",
  },
  {
    name: "Biofertilizers",
    image: "/images/fertilizer/biofertilizer.jpg",
    icon: "🦠",
    short:
      "Useful microorganisms that can help improve nutrient availability to plants.",
    details:
      "Biofertilizers contain beneficial microorganisms and should be selected according to crop, soil and recommended agricultural practice.",
    howTo:
      "Obtain a quality product from a reliable source and follow the product's recommended application method and crop-specific guidance.",
  },
  {
    name: "Jeevamrut",
    image: "/images/fertilizer/jeevamrut.jpg",
    icon: "💧",
    short:
      "A natural-farming bio-input prepared from locally available biological materials.",
    details:
      "Jeevamrut is promoted within natural-farming practices as an on-farm bio-input. Preparation should follow an agricultural department, ICAR/KVK or other credible technical recommendation.",
    howTo:
      "Prepare using a validated recipe and procedure from an agricultural extension source rather than relying on an unverified internet formulation.",
  },
  {
    name: "Beejamrut",
    image: "/images/fertilizer/beejamrut.jpg",
    icon: "🌾",
    short:
      "A natural-farming seed-treatment input used before sowing.",
    details:
      "Beejamrut is associated with natural-farming seed treatment practices.",
    howTo:
      "Use a validated preparation and seed-treatment procedure recommended by a credible agricultural extension source.",
  },
];


// ============================================================
// SIKKIM CASE STUDY
// ============================================================

const SIKKIM_TIMELINE = [
  {
    year: "2010",
    title: "Organic Mission",
    description:
      "Sikkim's organic transition was supported through the state's organic mission and policy direction.",
  },
  {
    year: "2015",
    title: "Transition expands",
    description:
      "The state continued moving agricultural land and farmers towards certified organic production.",
  },
  {
    year: "2016",
    title: "Sikkim becomes fully organic",
    description:
      "Sikkim became India's first fully organic state, with the transition covering its agricultural land.",
  },
  {
    year: "Today",
    title: "Beyond production",
    description:
      "The focus includes certification, processing, value chains, market access and improving the value of organic agricultural products.",
  },
];


// ============================================================
// COMPONENT
// ============================================================

export default function Fertilizer() {
  const [selectedBharat, setSelectedBharat] = useState(null);
  const [selectedOrganic, setSelectedOrganic] = useState(null);

  return (
    <div className="fertilizer-page">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="fertilizer-hero">

        <div className="fertilizer-hero-content">

          <div className="hero-badge">
            <Sprout size={16} />
            Soil Health & Nutrient Management
          </div>

          <h1>
            Feed the Soil.
            <br />
            <span>Grow Better Crops.</span>
          </h1>

          <p>
            Healthy crops begin with healthy soil. Learn how to understand
            NPK, test your soil, use fertilizers wisely and explore organic
            nutrient sources.
          </p>

          <div className="hero-points">
            <div>
              <CheckCircle2 size={18} />
              <span>Test your soil</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Understand NPK</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Use nutrients wisely</span>
            </div>
          </div>

        </div>

        <div className="fertilizer-hero-image">
          <img
            src="/images/fertilizer/fertilizer-hero.jpg"
            alt="Healthy agricultural field"
          />
        </div>

      </section>


      {/* ======================================================
          SECTION 1 - BALANCED NPK
      ====================================================== */}

      <section className="fertilizer-section">

        <div className="section-heading">

          <span className="section-tag">
            01 · UNDERSTAND YOUR SOIL
          </span>

          <h2>
            Why does balanced NPK matter?
          </h2>

          <p>
            Plants need nutrients in appropriate amounts and proportions.
            Applying fertilizer without understanding the soil can lead to
            unnecessary expenditure and inefficient nutrient management.
          </p>

        </div>


        <div className="npk-layout">

          <div className="npk-image-card">
            <img
              src="/images/fertilizer/npk-balance.jpg"
              alt="Balanced nitrogen phosphorus potassium"
            />

            <div className="npk-image-caption">
              <strong>N + P + K</strong>
              <span>
                Three major nutrients — different roles in crop growth.
              </span>
            </div>
          </div>


          <div className="npk-cards">

            {NPK.map((item) => (
              <div className="npk-card" key={item.symbol}>

                <div className="npk-symbol">
                  {item.symbol}
                </div>

                <div className="npk-content">

                  <div className="npk-title-row">
                    <h3>{item.name}</h3>
                    <span>{item.role}</span>
                  </div>

                  <p>{item.description}</p>

                  <div className="deficiency-box">
                    <Info size={15} />
                    <span>{item.signs}</span>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>


        <div className="balanced-note">

          <div className="balanced-note-icon">
            <Beaker size={24} />
          </div>

          <div>
            <strong>Important:</strong>

            <p>
              Balanced nutrient management does not mean using equal amounts
              of N, P and K. It means supplying nutrients according to the
              crop requirement and the actual nutrient status of the soil.
            </p>
          </div>

        </div>

      </section>


      {/* ======================================================
          SECTION 2 - SOIL TESTING
      ====================================================== */}

      <section className="fertilizer-section soil-testing-section">

        <div className="section-heading">

          <span className="section-tag">
            02 · TEST BEFORE YOU APPLY
          </span>

          <h2>
            Soil testing: Know before you fertilize
          </h2>

          <p>
            A Soil Health Card gives information about the nutrient status of
            the soil and provides fertilizer and soil-amendment recommendations.
          </p>

        </div>


        <div className="soil-testing-intro">

          <div className="soil-testing-image">
            <img
              src="/images/fertilizer/soil-testing.jpg"
              alt="Soil testing laboratory"
            />
          </div>

          <div className="soil-testing-text">

            <div className="testing-stat">
              <FlaskConical size={25} />
              <div>
                <strong>12 soil parameters</strong>
                <span>
                  The Soil Health Card covers major, secondary and
                  micronutrients along with important soil properties.
                </span>
              </div>
            </div>

            <div className="testing-stat">
              <Leaf size={25} />
              <div>
                <strong>Crop-specific advice</strong>
                <span>
                  The Soil Health Card can provide fertilizer and soil
                  amendment recommendations based on soil status.
                </span>
              </div>
            </div>

            <div className="testing-stat">
              <IndianRupee size={25} />
              <div>
                <strong>Reduce unnecessary input costs</strong>
                <span>
                  Soil testing helps move from guesswork towards need-based
                  nutrient application.
                </span>
              </div>
            </div>

          </div>

        </div>


        <h3 className="subsection-title">
          How to collect a soil sample
        </h3>


        <div className="soil-steps">

          {SOIL_STEPS.map((step) => (
            <div className="soil-step" key={step.number}>

              <div className="step-number">
                {step.number}
              </div>

              <div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>

            </div>
          ))}

        </div>


        <div className="soil-depth-card">

          <div className="depth-icon">
            <Mountain size={28} />
          </div>

          <div>
            <strong>Sampling depth</strong>
            <span>
              The Soil Health Card procedure specifies collection from about
              15–20 cm depth using a V-shaped cut.
            </span>
          </div>

        </div>


        <div className="testing-locations">

          <div className="location-heading">
            <MapPin size={24} />
            <div>
              <h3>Where can you get soil tested?</h3>
              <p>
                Look for an appropriate government or recognised agricultural
                testing facility.
              </p>
            </div>
          </div>


          <div className="location-grid">

            <div className="location-card">
              <strong>Government Soil Testing Laboratories</strong>
              <span>
                Agriculture Department soil-testing laboratories.
              </span>
            </div>

            <div className="location-card">
              <strong>Krishi Vigyan Kendra</strong>
              <span>
                ICAR-linked KVKs can be part of the soil-testing and advisory
                system.
              </span>
            </div>

            <div className="location-card">
              <strong>State Agricultural Universities</strong>
              <span>
                Agricultural universities and their recognised facilities.
              </span>
            </div>

            <div className="location-card">
              <strong>Mobile / Other Approved Laboratories</strong>
              <span>
                Depending on the state, mobile or other approved soil-testing
                facilities may also be available.
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          SECTION 3 - BHARAT FERTILIZERS
      ====================================================== */}

      <section className="fertilizer-section bharat-section">

        <div className="section-heading">

          <span className="section-tag">
            03 · KNOW YOUR FERTILIZER
          </span>

          <h2>
            Bharat Brand fertilizers
          </h2>

          <p>
            Fertilizers such as Urea, DAP, MOP and NPK are available through
            the government's Bharat branding initiative. Understand what each
            fertilizer supplies before choosing it for your crop.
          </p>

        </div>


        <div className="bharat-grid">

          {BHARAT_FERTILIZERS.map((fertilizer) => (

            <button
              className="bharat-card"
              key={fertilizer.name}
              onClick={() => setSelectedBharat(fertilizer)}
            >

              <div className="bharat-image">
                <img
                  src={fertilizer.image}
                  alt={fertilizer.name}
                />
              </div>

              <div className="bharat-card-content">

                <span className="fertilizer-label">
                  {fertilizer.nutrient}
                </span>

                <h3>{fertilizer.name}</h3>

                <p>{fertilizer.description}</p>

                <div className="learn-more">
                  Learn more
                  <ChevronRight size={17} />
                </div>

              </div>

            </button>

          ))}

        </div>


        <div className="bharat-warning">

          <Info size={22} />

          <p>
            <strong>Remember:</strong> A fertilizer being subsidized or widely
            available does not mean every crop or soil needs the same amount.
            Follow soil-test and crop-specific recommendations.
          </p>

        </div>

      </section>


      {/* ======================================================
          SECTION 4 - ORGANIC FERTILIZERS
      ====================================================== */}

      <section className="fertilizer-section organic-section">

        <div className="section-heading">

          <span className="section-tag">
            04 · CAN ALSO CONSIDER ORGANIC SOURCES
          </span>

          <h2>
            Organic fertilizers & farm-made inputs
          </h2>

          <p>
            Organic matter and biological inputs can form part of integrated
            nutrient management. Farmers can use suitable farm and locally
            available resources where appropriate.
          </p>

        </div>


        <div className="organic-grid">

          {ORGANIC_FERTILIZERS.map((item) => (

            <button
              className="organic-card"
              key={item.name}
              onClick={() => setSelectedOrganic(item)}
            >

              <div className="organic-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <span className="organic-icon">
                  {item.icon}
                </span>

              </div>

              <div className="organic-content">

                <h3>{item.name}</h3>

                <p>{item.short}</p>

                <div className="learn-more">
                  How to make / use
                  <ArrowRight size={17} />
                </div>

              </div>

            </button>

          ))}

        </div>


        <div className="organic-principle">

          <Recycle size={30} />

          <div>
            <strong>Think in terms of integrated nutrient management</strong>

            <p>
              Organic and inorganic nutrient sources do not have to be treated
              as an automatic either-or choice. The appropriate approach depends
              on soil condition, crop requirement, local resources and scientific
              recommendations.
            </p>
          </div>

        </div>

      </section>


      {/* ======================================================
          SECTION 5 - SIKKIM
      ====================================================== */}
{/* 
      <section className="fertilizer-section sikkim-section">

        <div className="sikkim-layout">

          <div className="sikkim-image">

            <img
              src="/images/fertilizer/sikkim-organic.jpg"
              alt="Organic farming landscape in Sikkim"
            />

            <div className="sikkim-image-label">
              <Sprout size={18} />
              Sikkim Organic Farming
            </div>

          </div>


          <div className="sikkim-content">

            <span className="section-tag">
              05 · INDIAN CASE STUDY
            </span>

            <h2>
              Sikkim's organic transformation
            </h2>

            <p>
              Sikkim provides an Indian example of a long-term state-level
              transition towards organic agriculture. The transformation was
              not simply about replacing one fertilizer with another — it
              involved policy, farming practices, certification and market
              development.
            </p>


            <div className="sikkim-highlight">

              <Sprout size={25} />

              <div>
                <strong>2016</strong>
                <span>
                  Sikkim became India's first fully organic state.
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="sikkim-timeline">

          {SIKKIM_TIMELINE.map((item, index) => (

            <div
              className="timeline-item"
              key={item.year}
            >

              <div className="timeline-number">
                {index + 1}
              </div>

              <div className="timeline-content">

                <span>{item.year}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

            </div>

          ))}

        </div>


        <div className="sikkim-lesson">

          <Wheat size={30} />

          <div>

            <h3>
              What can farmers learn from the example?
            </h3>

            <p>
              Organic agriculture works as a system. Soil management, crop
              planning, biological inputs, certification, processing and
              access to markets all matter. A state's experience should be
              adapted to local soil, climate, crops and market conditions
              rather than copied mechanically.
            </p>

          </div>

        </div>

      </section> */}

      
<section className="fertilizer-section sikkim-section">

  <div className="sikkim-layout">

    <div className="sikkim-image">

      <img
        src="/images/fertilizer/sikkim-organic.jpg"
        alt="Organic farmer and farming landscape in Sikkim"
      />

      <div className="sikkim-image-label">
        <Sprout size={18} />
        A Farmer's Organic Journey
      </div>

    </div>


    <div className="sikkim-content">

      <span className="section-tag">
        05 · INDIAN CASE STUDY
      </span>

      <h2>
        How a Sikkim farmer changed his farm
      </h2>

      <p>
        Imagine a farmer in Sikkim gradually moving away from chemical
        fertilizers and pesticides and rebuilding his farm around organic
        methods. The change was not simply about stopping chemical inputs.
        He had to improve soil health, manage crops differently, use
        biological inputs and, most importantly, find buyers willing to
        value organically produced crops.
      </p>


      <div className="sikkim-highlight">

        <Sprout size={25} />

        <div>
          <strong>THE CHANGE</strong>
          <span>
            Lower dependence on chemical inputs created a different
            farming model, where soil health, crop quality and market
            value became increasingly important.
          </span>
        </div>

      </div>

    </div>

  </div>


  <div className="sikkim-timeline">

    {SIKKIM_TIMELINE.map((item, index) => (

      <div
        className="timeline-item"
        key={item.year}
      >

        <div className="timeline-number">
          {index + 1}
        </div>

        <div className="timeline-content">

          <span>{item.year}</span>

          <h3>{item.title}</h3>

          <p>{item.description}</p>

        </div>

      </div>

    ))}

  </div>


  <div className="sikkim-lesson">

    <Wheat size={30} />

    <div>

      <h3>
        What changed for the farmer?
      </h3>

      <p>
        The important lesson is that going organic does not automatically
        mean higher income. A farmer has to manage the transition,
        maintain soil fertility, choose suitable crops, control production
        costs and connect with markets where better-quality produce can
        earn a better price. For a farmer in Sikkim, the potential benefit
        comes from combining lower dependence on external chemical inputs
        with better crop value, rather than depending on government policy
        alone.
      </p>

    </div>

  </div>

</section>




      {/* ======================================================
          FINAL MESSAGE
      ====================================================== */}

      <section className="fertilizer-final">

        <div className="final-icon">
          <Sprout size={32} />
        </div>

        <h2>
          Start with the soil.
        </h2>

        <p>
          Test it. Understand its nutrients. Choose the right source.
          Apply according to the crop requirement.
        </p>

      </section>


      {/* ======================================================
          BHARAT FERTILIZER MODAL
      ====================================================== */}

      {selectedBharat && (

        <div
          className="fertilizer-modal-overlay"
          onClick={() => setSelectedBharat(null)}
        >

          <div
            className="fertilizer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedBharat(null)}
            >
              <X size={22} />
            </button>

            <div className="modal-image">
              <img
                src={selectedBharat.image}
                alt={selectedBharat.name}
              />
            </div>

            <div className="modal-body">

              <span className="fertilizer-label">
                {selectedBharat.nutrient}
              </span>

              <h2>{selectedBharat.name}</h2>

              <p>
                {selectedBharat.description}
              </p>

              <div className="modal-info-box">
                <strong>Farmer guidance</strong>
                <span>{selectedBharat.use}</span>
              </div>

            </div>

          </div>

        </div>

      )}


      {/* ======================================================
          ORGANIC FERTILIZER MODAL
      ====================================================== */}

      {selectedOrganic && (

        <div
          className="fertilizer-modal-overlay"
          onClick={() => setSelectedOrganic(null)}
        >

          <div
            className="fertilizer-modal organic-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedOrganic(null)}
            >
              <X size={22} />
            </button>

            <div className="modal-image">
              <img
                src={selectedOrganic.image}
                alt={selectedOrganic.name}
              />
            </div>

            <div className="modal-body">

              <h2>{selectedOrganic.name}</h2>

              <p>
                {selectedOrganic.details}
              </p>

              <div className="how-to-box">

                <div className="how-to-heading">
                  <CheckCircle2 size={20} />
                  <strong>How to make / use</strong>
                </div>

                <p>
                  {selectedOrganic.howTo}
                </p>

              </div>

              <div className="modal-note">
                <Info size={18} />

                <span>
                  For farm-made inputs, follow guidance from your local
                  Agriculture Department, KVK or agricultural university,
                  especially for preparation quantities and application rates.
                </span>
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}