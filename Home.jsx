import {useState,useEffect} from 'react'
import {getP,idser,stP} from '../Api/api'
const Home = () => {
    const [data,setData] = useState([])
    const [fil,setFil] = useState([])
    const [sid,setSid] = useState("")
    const [sortval,setSortval] = useState("")

    const opt = ["title","body"]

    const getData= async() =>{
        try{
            const res = await getP()
            setData(res.data)
            setFil(res.data)
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    const filter = (e)=>{
        setFil(data.filter(f => f.title.toLowerCase().includes(e.target.value)))
    }

    const serbyID = async() =>{
        const res= await idser(sid)
        setFil(res.data)
    }

   const serid = (e) =>{
    e.preventDefault()
    serbyID()
    setSid('')
   }
   const res =()=>{
    getData()
   }

   const handlesort = async(e) =>{
    let value = e.target.value;
    setSortval(value)
    console.log(sortval)

    const res = await stP(value)
    setFil(res.data) 
   }
//    const reset = () =>{
//     getData()
//     setSid('')
  
//     // setFil(data)
//    }

   

  return (
    <div>
      <h1>Search and Sort</h1>
      <label>Search By Title</label>
      <input type="text" onChange={filter}/>
      <br/><br/>
      <button onClick={res}>reset</button>
      <br/><br/>
      <label>search by ID</label>
      <form onSubmit={serid}>
        <input type="text" value={sid} onChange={(e)=>setSid(e.target.value)}/>
        <button type="submit">Search</button>
        {/* <button onClick={reset}>reset</button> */}
      </form>

      <h1>ace and dec</h1>
      <select
       onChange={handlesort}
       value={sortval}
      >
        <option>select</option>
        {
            opt.map((it)=>(
                <option value={it}>{it}</option>
            ))
           }
      </select>
    
      <br/><br/>
      <table border={2}>
        <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
        </tr>

      <tbody>
        {
            fil.map((d,i)=>{
                const {id,title,body} = d;
                return(
                    <tr key={i}>
                        <td>{id}</td>
                        <td>{title}</td>
                        <td>{body}</td>
                    </tr>
                )
            })
        }
      </tbody>
      </table>
    </div>
  )
}

export default Home
