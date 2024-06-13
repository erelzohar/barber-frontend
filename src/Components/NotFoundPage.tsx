import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function NotFoundPage(): JSX.Element {
    return (
        <div className="NotFoundPage">
			<h1><SentimentVeryDissatisfiedIcon fontSize="inherit" /></h1>
			<h3>הדף שחיפשת לא נמצא</h3>
            <Link to="/">Back to home page</Link>
        </div>
    );
}

export default NotFoundPage;
