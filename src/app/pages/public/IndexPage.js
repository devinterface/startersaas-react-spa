import React, { } from 'react'
import { useTranslation } from 'react-i18next'
import PlansSection from 'app/components/public/PlansSection'

const IndexPage = (props) => {
  const { t } = useTranslation()

  return (
    <div>
      <section className='d-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center mb-5 p-3' id='intro-home'>
        <div className='container-fluid d-flex justify-content-lg-center justify-content-xl-center align-items-xl-center'>
          <div className='row d-flex justify-content-center flex-md-row justify-content-xl-center'>
            <div className='col-sm-10 col-md-6 col-lg-6 col-xl-4 offset-xl-1 d-flex flex-row align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center mb-3'>
              <div>
                <h1 className='text-left mb-3'><strong>Creiamo post per i tuoi canali social e&nbsp;articoli per il tuo blog aziendale</strong><br /></h1>
                <p className='text-left'>Pacchetti di gestione contenuti blog e social a canone mensile. Disdici quando vuoi, senza costi aggiuntivi.</p><a className='btn btn-primary' role='button' href='#contatti'>Contattaci</a>
              </div>
            </div>
            <div className='col-sm-10 col-md-6 col-lg-6 col-xl-4 offset-xl-0 d-flex flex-row align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center mb-3'>
              <div><img className='d-xl-flex img-responsive' data-aos='zoom-in' data-aos-once='true' src='/images/copertina-articoli-social.svg' /></div>
            </div>
          </div>
        </div>
      </section>
      <section id='primo-paragrafo' className='mb-5'>
        <div className='container d-xl-flex justify-content-xl-center'>
          <div className='row d-md-flex d-lg-flex flex-column align-items-md-center flex-lg-row justify-content-lg-center justify-content-xl-center'>
            <div className='col-md-10 col-lg-7 col-xl-6 offset-lg-0 offset-xl-0'>
              <p className='text-center'>Non hai tempo per scrivere articoli e gestire i tuoi canali social? Vorresti creare contenuti per il tuo blog e le tue pagine Facebook e Instagram in maniera professionale ma non sai come fare?<br /></p>
              <p className='text-center'><strong>Non preoccuparti, per questo ci siamo noi di ArticolieSocial!</strong><br /></p>
            </div>
          </div>
        </div>
      </section>
      <section className='d-flex mb-5' id='vantaggi'>
        <div className='container d-flex justify-content-md-center justify-content-xl-center'>
          <div className='row d-flex justify-content-center flex-md-row justify-content-lg-between'>
            <div className='col-9 col-md-4 col-lg-4 col-xl-4 d-flex flex-column justify-content-center align-items-center mb-3'>
              <div className='icon-wh mb-3'><img className='d-flex img-responsive' data-aos='zoom-in' data-aos-once='true' src='/images/post-social.svg' /></div>
              <p className='d-flex justify-content-center text-center'>Pubblichiamo contenuti professionali su Facebook e Instagram.</p>
            </div>
            <div className='col-9 col-md-4 col-lg-4 col-xl-4 d-flex flex-column justify-content-center align-items-center mb-3'>
              <div className='d-xl-flex justify-content-xl-center align-items-xl-center icon-wh mb-3'><img className='d-flex img-responsive' data-aos='zoom-in' data-aos-once='true' src='/images/post-copywriting.svg' /></div>
              <p className='d-flex justify-content-center text-center'>Creiamo articoli in ottica SEO per il tuo blog aziendale.</p>
            </div>
            <div className='col-9 col-md-4 col-lg-4 col-xl-4 d-flex flex-column justify-content-center align-items-center mb-3'>
              <div className='d-xl-flex justify-content-xl-center align-items-xl-center icon-wh mb-3'><img className='d-flex align-items-xl-center img-responsive' data-aos='zoom-in' data-aos-once='true' src='/images/clients-grow-social.svg' /></div>
              <p className='d-flex justify-content-center text-center'>Facciamo conoscere la tua attività a possibili clienti.</p>
            </div>
          </div>
        </div>
      </section>

      <section id='image-text' className='mb-5'>
        <div className='container'>
          <div className='row d-lg-flex flex-column-reverse flex-md-row align-items-lg-center mb-5'>
            <div className='col'>
              <h2>I social oggi sono&nbsp;essenziali&nbsp;</h2>
              <p>I social al giorno d’oggi sono essenziali per chi gestisce un'attività. Per usarli al meglio servono tempo e conoscenza del settore. Affida i tuoi canali social a dei professionisti del social media marketing.</p>
            </div>
            <div className='col'><img data-aos='zoom-in' data-aos-once='true' className='img-responsive mb-2' src='/images/social-media-marketing.svg' /></div>
          </div>
          <div className='row d-lg-flex flex-column flex-md-row align-items-lg-center'>
            <div className='col'><img data-aos='zoom-in' data-aos-once='true' className='img-responsive mb-2' src='/images/servizio-articoli.svg' /></div>
            <div className='col'>
              <h2>Il blog rende visibile il tuo sito</h2>
              <p>Un blog aziendale serve a comunicare la propria presenza online, aumentare le visite al sito e posizionarsi sui motori di ricerca. Grazie al nostro servizio possiamo farti raggiungere questi risultati.</p>
            </div>
          </div>
        </div>
      </section>

      <PlansSection />

      <section id='chi-siamo'>
        <div className='container justify-content-center'>
          <div className='row d-flex flex-column justify-content-center align-items-center mb-5'>
            <div className='col-sm-9 col-md-7 col-lg-6 col-xl-5'><img data-aos='zoom-in' data-aos-once='true' className='img-responsive mb-2' src='images/web-marketing-chi-siamo.svg' /></div>
            <div className='col-sm-11 col-md-10 col-lg-7 col-xl-6'>
              <h2 className='text-center'>Esperti di comunicazione sul web</h2>
              <p className='text-center'>Siamo un gruppo di professionisti del web marketing specializzati nella scrittura di blog post e nella gestione di profili Facebook e Instagram. Con le attività che ti forniamo vedrai subito dei risultati.<br /></p>
              <p className='text-center'>Otterrai più visibilità, più contatti e più clienti. Blog e canali social sono la vetrina del tuo negozio online, noi la rendiamo unica!<br /></p>
            </div>
          </div>
        </div>
      </section>
      <section id='servizi'>
        <div className='container mb-5 p-3' id='container-servizi'>
          <div className='row d-flex d-xl-flex flex-column-reverse align-items-center flex-md-column-reverse flex-lg-row align-items-xl-center'>
            <div className='col-md-11 col-lg-7 col-xl-7 offset-md-0'>
              <h2 className='mb-3'>Tutti i nostri servizi</h2>
              <div className='row flex-column'>
                <div className='col-sm-12 col-md-10 col-lg-11 col-xl-11 mb-2'>
                  <p>Creiamo da zero le tue pagine social e le predisponiamo per far conoscere al meglio la tua attività,&nbsp;sia per Facebook che per Instagram.</p>
                  <p>Hai già creato le tue pagine social ma vorresti ottimizzarle? Le mettiamo a posto una volta per tutte, con copertine personalizzate e informazioni complete e aggiornate.</p>
                  <p>Colleghiamo le tue pagine Facebook e Instagram in modo da avere un controllo completo della loro gestione.</p>
                  <p>Hai materiale scritto o audio video che può essere utile per sponsorizzare la tua azienda? Inviacelo e noi lo ottimizziamo per la pubblicazione sui social!</p>
                  <p>Creiamo il piano editoriale mensile e lo condividiamo con te prima di pubblicare i contenuti, in modo che tu abbia tutto sotto controllo.</p>
                  <p>Realizziamo articoli per il tuo blog di lunghezza compresa tra i 500 e i 1000 caratteri.</p>
                  <p>Scriviamo contenuti originali, utilizzando le parole chiave che possono migliorare il posizionamento del tuo sito web.</p>
                  <p>Studiamo grafiche ad hoc, troviamo le immagini, scriviamo i testi e scegliamo gli hashtag giusti per far conoscere la tua attività.</p>
                  <p>Pubblichiamo i post e le stories a scadenze regolari e raggiungendo più pubblico possibile.</p>
                  <p>Sponsorizziamo i post per farti conoscere a nuovi utenti interessati al tuo business.</p>
                  <p>Compiliamo un report mensile sull’andamento dei canali social, così da vedere i miglioramenti e le ottimizzazioni da fare.</p>
                </div>
              </div>
            </div>
            <div className='col-11 col-md-7 col-lg-5 d-flex align-items-md-center mb-2'><img data-aos='zoom-in' data-aos-once='true' className='img-responsive' src='/images/servizi-web-marketing.svg' /></div>
          </div>
        </div>
      </section>
      <section id='contatti' className='mb-5'>
        <div className='container d-xl-flex justify-content-xl-center'>
          <div className='row d-md-flex d-lg-flex flex-column-reverse justify-content-center flex-md-row align-items-lg-center mb-3'>
            <div className='col-md-10 col-lg-8 col-xl-7'>
              <h2 className='text-center'>Contattaci subito</h2>
              <p className='text-center'>Scrivici il piano che vuoi e ti daremo tutte le informazioni che ti servono. Se hai bisogno di un piano personalizzato facci sapere, possiamo fornirti diversi servizi di marketing e comunicazione sul web a un prezzo speciale.<br /></p>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row d-lg-flex d-xl-flex justify-content-center'>
            <div className='col-lg-8 col-xl-9'>
              <div className='row d-xl-flex justify-content-center'>
                <div className='col-lg-12'>
                  <form method='post'>
                    <div className='d-xl-flex flex-column justify-content-lg-around justify-content-xl-between'>
                      <div className='form-group'><input className='form-control' type='text' name='nome' placeholder='Nome' /></div>
                      <div className='form-group'><input className='form-control' type='text' name='cognome' placeholder='Cognome' /></div>
                    </div>
                    <div className='d-flex flex-column flex-sm-column justify-content-lg-between justify-content-xl-between'>
                      <div className='form-group'><input className='form-control' type='text' name='email' placeholder='Email' /></div>
                      <div className='form-group'><input className='form-control' type='text' name='telefono' placeholder='Telefono' /></div>
                    </div>
                    <div className='flex-column flex-lg-row justify-content-xl-center'>
                      <div className='form-group'><textarea className='form-control' name='messaggio' placeholder='Messaggio' rows='8' /></div>
                    </div>
                    <div className='form-check d-xl-flex mb-3'><input className='form-check-input d-xl-flex' type='checkbox' /><label className='form-check-label'>Ho preso visione <a href='#'>dell’informativa sulla Privacy</a>.</label></div>
                    <div className='form-group'><button className='btn btn-primary' type='button'>Invia</button></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='d-flex p-2' id='footer'>
        <div className='container'>
          <div className='row d-xl-flex justify-content-center'>
            <div className='col-xl-6 d-flex justify-content-center pt-3'>
              <p className='text-center font-size-small'>ArticolieSocial è un servizio di <a href='https://www.mintmarketing.it/'>Mint Marketing SRL</a>&nbsp;- <a href='#'>Privacy e Cookie Policy</a><br /></p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
export default IndexPage
