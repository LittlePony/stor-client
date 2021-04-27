import DriveListItem from "../DriveListItem";

const DriveList = ({drives, onMount, onUnmount, onFormat}) => {
    return (
        <div>
        {
            Object.entries(drives).map(([pk, drive]) => (
                <DriveListItem
                    onMount={onMount}
                    onUnmount={onUnmount}
                    onFormat={onFormat}
                    key={pk}
                    drive={drive} />
            ))
        }
        </div>
    )
};

DriveList.defaultProps = {
    drives: {},
}
export default DriveList;
