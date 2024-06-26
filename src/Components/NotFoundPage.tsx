import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function NotFoundPage(): JSX.Element {
    return (
        <div className="NotFoundPage">
			<SentimentVeryDissatisfiedIcon fontSize="inherit" />
			<h3>הדף שחיפשת לא נמצא</h3>
            <Link to="/">חזרה לדף הבית</Link>
        </div>
    );
}

export default NotFoundPage;
