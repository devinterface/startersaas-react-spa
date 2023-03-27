import { Plans } from "api/queries";
import Loader from "app/components/Loader";

import { useQuery } from "react-query";
import PlanComponent from "./PlanComponent";

const PlansSection = (plans) => {
  const { isLoading, data } = useQuery("Plans", Plans, {
    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section id="prezzi" className="mb-5">
      <div className="container p-4" id="container-prezzi">
        <div className="text-center">
          <div className="row d-flex d-sm-flex d-lg-flex flex-column align-items-center flex-lg-row justify-content-lg-center mb-4">
            <div className="col-sm-11 col-md-10 col-lg-8 col-xl-6">
              <h2>Due piani social e blog completi</h2>
              <p>
                Il nostro servizio è semplice, efficace ed economico. Scegli tra
                due piani: quello Base è pensato per le piccole aziende, negozi
                e attività che hanno bisogno di crescere. Quello Pro è adatto
                alle medie e grandi imprese che vogliono avere una presenza
                online importante.
              </p>
            </div>
          </div>
          <div
            className="row d-flex d-sm-flex d-lg-flex flex-column align-items-center flex-lg-row justify-content-lg-center align-items-lg-start align-items-xl-start mb-5"
            data-aos="zoom-in-up"
            data-aos-once="true"
          >
            {data && data.data.plans.length > 0
              ? data.data.plans.map((plan) => (
                  <PlanComponent key={plan.id} plan={plan} />
                ))
              : "Non ci sono piani disponibili"}
            <ul>
              <li>
                <i>
                  per "sponsorizzazioni sui social" si intende la
                  sponsorizzazione diretta di post pubblicati.
                </i>
              </li>
              <li>
                <i>
                  per ideazione linea grafica su Instagram (IG) si intende la
                  linea grafica coerente da seguire nelle varie pubblicazioni
                  (elemento base per gestire professionalmente Instagram essendo
                  un social visual)
                </i>
              </li>
            </ul>
          </div>
          <div className="row d-flex d-sm-flex d-lg-flex flex-column align-items-center flex-lg-row justify-content-lg-center">
            <div className="col-sm-11 col-md-8 col-lg-6 col-xl-5 mb-3">
              <h4 className="h2-small">Rinnovi e disdette</h4>
              <p>
                I pacchetti sono rinnovabili mensilmente, disdici il servizio
                quando vuoi senza costi aggiuntivi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PlansSection;
