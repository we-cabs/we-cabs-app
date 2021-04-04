import noData from '../../img/no_data_found.png';
import './NoDataFound.css';

const NoDataFound = () => {
    return (
       <div className="no_data_found_section">
           <img src={noData}/>
       </div>
    );
  }

export default NoDataFound;