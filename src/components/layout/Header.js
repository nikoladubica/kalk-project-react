import axios from "axios";
import syncWhiteIcon from "../../icons/sync/sync-white.svg";
import Button from "../Button/Button";

const Header = () => {
    const clickHandler = () => {
        return axios.post('/api/fetch-external?dateFrom=2023-10-01&dateTo=2023-10-10')
    }

    return (
        <header className="Header flex items-center justify-between p-6">
            <div>
                <span className='font-bold text-lg'>kalk-project</span>
            </div>
            
            <div className="flex items-center gap-4">
                <Button image={syncWhiteIcon} text={'Sync'} sync={true} type={'small'} functionality={clickHandler} />
                <span className='font-thin text-lg'>v0.1.0</span>
            </div>
        </header>
    );
  }
  
  export default Header;