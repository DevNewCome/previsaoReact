import nuvemImg from '../../img/nuvens.png'
import ventoImg from '../../img/vento.png'
import umidadeImg from '../../img/umidade.png'
import { useState, useEffect } from 'react'
import {  toast } from 'react-toastify';
import './index.css'


export default function Home(){

    const [input, setInput] = useState('')
    const [temperatura, setTemperatura] = useState(null);
    const [cidade, setCidade] = useState(null)
    const [vento, setVento] = useState(null)
    const [nuvem, setNuvem] = useState(null)
    const [umidade, setUmidade] = useState(null)
    const [tempMax, setTempMax] = useState(null)
    const [tempMin, setTempMin] = useState(null)
    const [ description, setDescription ] = useState(null)
    const [pais, setPais] = useState(null)
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
  
    
    const apiKey = '796655c4df4abd5e7bf0947b70dc2912';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Sao%20Paulo,BR&appid=${apiKey}&units=metric&lang=pt_br`;
   

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch(url);
            
          if (response.status === 200) {
            const data = await response.json();
   
            setTemperatura(data.main.temp);
            setCidade(data.name);
            setNuvem(data.clouds.all)
            setVento(data.wind.speed)
            setUmidade(data.main.humidity)
            setTempMax(data.main.temp_max)
            setTempMin(data.main.temp_min)
            setDescription(data.weather[0].description)
            setPais(data.sys.country)
         
            console.log(data)

          } else {
            console.log('Erro na API');
          }
        } catch (error) {
          console.log('Erro', error);   
        }
      }
      fetchData();
    }, []);
  
    async function pesquisa(){
        try{
          let apiKey = '796655c4df4abd5e7bf0947b70dc2912'
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=metric&lang=pt_br`
          let url2 = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`
          let response =  await fetch(url)
             if(response.status === 200){   
                  const data = await response.json()
                          setTemperatura(data.main.temp);
                          setCidade(data.name)
                          setNuvem(data.clouds.all)
                          setVento(data.wind.speed)
                          setUmidade(data.main.humidity)
                          setTempMax(data.main.temp_max)
                          setTempMin(data.main.temp_min)
                          setDescription(data.weather[0].description)
                          setPais(data.sys.country);
                          setLat(data.coord.lat);
                          setLon(data.coord.lon)
                          toast.success('cidade encontrada')
                          console.log(data)
                                    
              } else {
                toast.warn('cidade não existe')
              }
        }
        catch{
            console.log('erro')
        }
        
    }

  let pressEnter = (e) => e.key === 'Enter' && pesquisa()
  

return(

    <div id='container'>

    <div className='painel'>
   
      <div className='painel-superior'>
          <div className='conteudo-left'>
              <h2>Now</h2>
              <h1 className='temperatura'>{temperatura}</h1>
              <h2 className='cidade'>{cidade}</h2> 
              <h3 className='pais'>{pais}</h3>
          </div>
        
          <div className='conteudo-center'>
            {temperatura > 20 ? (
              <>
              <div className='borda'></div>   
              </>
            ): (
              <div className='borda' style={{backgroundColor: 'blue'}}></div> 
            )}
       
        <div className='imgs'>
            <div className='img'>
                  <img src={nuvemImg} alt="" />
              </div>
              <div className='img'>
                  <img src={ventoImg} alt="" />
              </div>
              <div className='img'>
                  <img src={umidadeImg} alt="" />
               </div>
            </div>
            <div className='informations-center'>
                <label htmlFor="">Nuvens</label>
                <h1 className='nuvem'>{nuvem}</h1>
                <label htmlFor="">Vento</label>
                <h1 className='km'>{vento} Km/h</h1>
                <label htmlFor="">Umidade</label>
                <h1 className='umidade'>{umidade} %</h1>
              </div>       
          </div>
          <div className='conteudo-right'>
              <div className='right-topo'>
                <h1>Today</h1>
                <img src="" alt="" />
              </div>
              <div className='description'>
                    <h1>{description}</h1>
              </div>
              <div className='right-baixo'>
                  <div className='max'>
                  <h1>Max</h1>
                   <span>{tempMax}</span>
                  </div>
                    <div className='min'>
                    <h1>Min</h1>
                    <span>{tempMin}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className='painel-inferior'>
      </div>
    </div>
    <div id='inputs'>
    <input className='input' placeholder='Digite o nome' onKeyDown={pressEnter} value={input} onChange={(e) => setInput(e.target.value)}></input>
    <button onClick={pesquisa}>Search</button>
    </div>
  </div>
) 
}