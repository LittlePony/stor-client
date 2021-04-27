import styles from "./PartitionListItem.module.css";

const PartitionListItem = ({partition, onMount, onUnmount, onFormat}) => {
    const handleMountClick = () => onMount(partition.name);
    const handleUnmountClick = () => onUnmount(partition.name);
    const handleFormatClick = () => onFormat(partition.name);

    return (
        <div className={styles.box}>
            <div className={styles.driveProps}>
                <div className={styles.nameCol}>{partition.name}</div>
                <div className={styles.sizeCol}>{partition.size}</div>
                <div className={styles.mountpointCol}>{partition.mountpoint}</div>
                <div className={styles.buttons}>
                    <button
                        onClick={handleMountClick}>
                        mount
                    </button>
                    <button
                        onClick={handleUnmountClick}>
                        unmount
                    </button>
                    <button
                        onClick={handleFormatClick}>
                        format
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PartitionListItem;
