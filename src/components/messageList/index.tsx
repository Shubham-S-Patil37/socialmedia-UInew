import { Dispatch, FC, SetStateAction } from 'react'
import "./messagePersonList.css"

interface listProps {
  nameList: string[],
  onChatChange: (name: string) => void;
}
const MessagePersonList: FC<listProps> = ({ nameList, onChatChange }) => {
  return (
    <div className='messagePersonList-parent'>
      <ul className='messagePersonList-ul'>
        {
          nameList.map((ele: string) =>
            <li className='messagePersonList-li' onClick={() => onChatChange(ele)}>{ele}</li>
          )
        }
      </ul>
    </div>
  )
}

export default MessagePersonList;
