import { Dispatch, FC, SetStateAction } from 'react'
import "./sidebar.css"

interface sidebarPopUp {

  setMenuClick: Dispatch<SetStateAction<string>>;

}

const Sidebar: FC<sidebarPopUp> = ({ setMenuClick }) => {

  const sidebarItem = ["Feed", "Profile", "Upload", "Message", "Setting"]

  return (
    <div className='sidebar-parent'>
      <ul className='sidebar-ul'>
        {sidebarItem.map(ele =>
          <li className='menu-item' onClick={(e) => setMenuClick(ele)}>{ele}</li>
        )}
      </ul>
    </div>
  )
}
export default Sidebar;