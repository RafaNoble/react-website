import './PageButtons.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

export default function PageButtons(props) {
    const [disablePrev, setDisablePrev] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    
    function getMaxPag(items) {
        if (items % props.itemsXPage === 0)
            return Math.trunc(items / props.itemsXPage);
        else {
            if (Math.trunc(items / props.itemsXPage) === 0)
                return 1;
            else
                return (Math.trunc(items / props.itemsXPage) + 1);
        }
    }

    const maxPages = getMaxPag(props.numItems);

    useEffect(() => {
        if ((params.p !== undefined && !Number.isInteger(parseInt(params.p))) || (parseInt(params.p) <= 0 || parseInt(params.p) > maxPages))
            navigate("notfound");

        if (params.p === undefined || parseInt(params.p) === 1)
            setDisablePrev(true);
        else
            setDisablePrev(false);

        if ((params.p === undefined && maxPages === 1) || parseInt(params.p) === maxPages)
            setDisableNext(true);
        else
            setDisableNext(false);

        if (disablePrev && parseInt(params.p) === 1)
            navigate(props.urlHeader);
    }, [params.p, maxPages, navigate, disablePrev, props.urlHeader]);

    function handleClickPrevious() {
        if (parseInt(params.p) === 2)
            navigate(props.urlHeader);
        else {
            navigate(props.urlHeader + `page/${parseInt(params.p) - 1}`);
        }
    }

    function handleClickNext() {
        if (params.p === undefined)
            navigate(props.urlHeader + "page/2");
        else
            navigate(props.urlHeader + `page/${parseInt(params.p) + 1}`);
    }
    
    return (
        <div className="page-buttons">
            <button 
                className="page-previous-button"
                style={{fontSize: "20px"}}
                type="button"
                disabled={disablePrev}
                onClick={() => handleClickPrevious()}
            >
                <RiArrowLeftLine className="page-previous-button-icon"/>
            </button>
            {disablePrev ? (<div>1</div>)
                         : (<div>{params.p}</div>)}
            <button 
                className="page-next-button"
                style={{fontSize: "20px"}}
                type="button"
                disabled={disableNext}
                onClick={() => handleClickNext()}
            >
                <RiArrowRightLine className="page-next-button-icon"/>
            </button>
        </div>
    )
}
