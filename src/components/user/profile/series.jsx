import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function Series(){
  const [series, setSeries] = useState([]);
  useState(()=>{
    if(localStorage.getItem('token')){
      axios.get('https://api.betaseries.com/shows/member?client_id=' + process.env.REACT_APP_APIKEY + '&access_token=' + localStorage.getItem('token'))
      .then(function (response) {
          setSeries(response.data.shows)
          console.log(response.data.shows)
      }).catch(function (error) {
          console.log(error);
      })
  }
  },[])
  return(
    <div>
      <div className="md:w-1/1 p-3 lg:mx-60">
        <div className="bg-white border rounded-lg shadow-lg p-5">
          <table className="auto w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="w-3/5 py-3 px-6">Liste des séries vu</th>
                <th className="w-3/5 py-3 px-6 text-center">status</th>
                <th className="w-3/5 py-3 px-6 text-center">archivé?</th>
              </tr>
            </thead>
            <tbody>
                {series.map((serie, index) => {
                  return (
                    <tr>
                      <td className="w-4/5 py-3 px-6">
                        <p className='text-blue-500 hover:text-blue-700'>- <a href={"/series/"+serie.id}>{serie.title}</a></p>
                      </td>
                      <td>
                        {serie.user.status == 100 ? (<p className='text-green-500 text-center'>terminé</p>) : (<p className='text-blue-500 text-center'>en cours</p>)}
                      </td>
                      <td>
                        {serie.user.archived ? (<p className='text-orange-500 text-center'>oui</p>) : (<p className='text-blue-500 text-center'>non</p>)}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
}