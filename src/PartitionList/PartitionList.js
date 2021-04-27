import PartitionListItem from "../PartitionListItem";

const PartitionList = ({partitions, onMount, onUnmount, onFormat}) => {
    return (
        <div>
        {
            Object.entries(partitions).map(([name,partition]) => (
                <PartitionListItem
                    onMount={onMount}
                    onUnmount={onUnmount}
                    onFormat={onFormat}
                    key={name}
                    partition={partition}/>
            ))
        }
        </div>
    )
}

PartitionList.defaultProps = {
    partitions: {},
}

export default PartitionList;
