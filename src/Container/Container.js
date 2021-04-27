import React from "react";
import { APIURL } from "../config";
import DriveList from "../DriveList";
import styles from "./Container.module.css";
import MountPointDialog from "../MountPointDialog";

const initialState ={
    drives: {},
    isMountPointDialogOpen: false,
    mountPointForDevice: "",
}

class Container extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.fetchDrives();
    }

    normalizeDrives(drives) {
        /** keyed by pk */
        return drives.reduce((acc, drive) => {
            if (drive.children) {
                drive.children = this.normalizeDrives(drive.children)
            }
            acc[drive.name] = drive
            return acc
        }, {})
    }

    updateDrives(drive) {
        if (drive.type === "disk") {
            this.setState({drives: {
                ...this.state.drives,
                    ...{[drive.name]: drive}
            }})

        } else if (drive.type === "part") {
            const driveName = drive.name.split("")
                .filter(x => x < "0" || x > "9").join("")

            this.setState({
                drives: {
                    ...this.state.drives, ...{
                        [driveName]: {
                            ...this.state.drives[driveName],
                            children: {
                                ...this.state.drives[driveName].children,
                                [drive.name]: drive,
                            }
                        },
                    }
                }
            })
        }
        this.setState({
            isMountPointDialogOpen: false,
            mountPointForDevice: '',
        })
    }

    fetchDrives() {
        const fetchParams = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.access}`,
            }
        };
        fetch(`${APIURL}/drives`, fetchParams)
            .then(response => response.json())
            .then(drives => this.setState({drives: this.normalizeDrives(drives)}))
            .catch(err => console.error(err))
    };

    handleMountPointDialogClose = () => this.setState({
        isMountPointDialogOpen: false,
        mountPointForDevice: '',
    });

    handleMount = deviceName => this.setState({
            isMountPointDialogOpen: true,
            mountPointForDevice: deviceName,
    });

    confirmMount = (deviceName, mountpoint) => {
        const fetchParams = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.access}`,
            },
            body: JSON.stringify({mountpoint})
        };
        fetch(`${APIURL}/drives/${deviceName}/mount/`, fetchParams)
            .then(response => response.json())
            .then(drives => this.updateDrives(drives))
            .catch(err => console.error(err))
    };

    handleUnmount = deviceName => {
        const fetchParams = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.access}`,
            }
        };
        fetch(`${APIURL}/drives/${deviceName}/unmount/`, fetchParams)
            .then(response => response.json())
            .then(drives => this.updateDrives(drives))
            .catch(err => console.error(err))
    };

    handleFormat = deviceName => {
        const fetchParams = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.props.access}`,
            }
        };
        fetch(`${APIURL}/drives/${deviceName}/format/`, fetchParams)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    };

    render() {
        return (
            <div className={styles.box}>
                <DriveList
                    onMount={this.handleMount}
                    onUnmount={this.handleUnmount}
                    onFormat={this.handleFormat}
                    drives={this.state.drives}/>
                <MountPointDialog
                    onClose={this.handleMountPointDialogClose}
                    onConfirm={this.confirmMount}
                    device={this.state.mountPointForDevice}
                    isOpen={this.state.isMountPointDialogOpen}/>
            </div>
        )
    };
}

export default Container;
