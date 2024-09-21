import PropTypes from "prop-types";

export default function LoadingElement({loadingSuccess}) {
    if (loadingSuccess !== null && !loadingSuccess) {
        return <div className="error">An internal error has occurred</div>;
    }
    return (
        <>
            <div>Loading...</div>
        </>
    );
}

LoadingElement.propTypes = {
    loadingSuccess: PropTypes.bool,
};
