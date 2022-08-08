import React, {useEffect, useState} from 'react';

import Toolbar from "../components/toolbar/Toolbar";
import Settingbar from "../components/settingbar/Settingbar";
import Canvas from "../components/canvas/Canvas";
import '../app.scss';
import Modal from "../components/modal/modal";

const HomePage = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const [alertText, setAlertText] = useState(
        'Hello. Now you can join any active session or start your own.'
    );
    const [alertVisible, setAlertVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAlertVisible(false);
        }, 5000);
    }, [alertText]);

    return (
        <div className="app">
            <Toolbar/>
            <Settingbar/>
            {alertVisible &&
                <div className="alert alert-success text-center" role="alert">
                    {alertText}
                </div>
            }

            <Canvas/>
            {modalVisible &&
                <Modal
                    setModalVisible={setModalVisible}
                    setAlertText={setAlertText}
                    setAlertVisible={setAlertVisible}
                />}
        </div>
    );
};

export default HomePage;