import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }
  }

  useEffect(() => {
    fetchAllUsers()
    // Aplicar el estilo de fondo gris claro al body
    document.body.style.backgroundColor = '#f1f5f9';
    // Limpiar el estilo del body cuando el componente se desmonta
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [])

  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable rounded-md text-sm hover:shadow-lg'>
        <thead>
          <tr className='bg-black text-white'>
            <th>#</th>
            <th>NOMBRE</th>
            <th>CORREO ELECTRÓNICO</th>
            <th>ROL</th>
            <th>FECHA DE CREACIÓN</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            allUser.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td className='uppercase'>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button className='bg-blue-400 p-2 rounded-full cursor-pointer hover:bg-blue-950 hover:text-white'
                      onClick={() => {
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers