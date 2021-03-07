import loader from '../../img/Gear-0.2s-200px.gif';
import './Loader.css';

const Loader = () => {
    return (
       <div className="loader_section">
           <img src={loader}/>
       </div>
    );
  }

export default Loader;