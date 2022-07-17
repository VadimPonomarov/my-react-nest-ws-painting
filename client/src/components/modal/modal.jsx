import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";
import {v4 as uuid} from 'uuid';

import {WS_CONSTANT} from '../../constants';
import canvasState from '../../store/canvasState';
import css from './modal.module.scss';
import {getSocket, handleOnSubmit} from "../../services";


const Modal = ({setModalVisible, setAlertText, setAlertVisible}) => {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const socket = getSocket(WS_CONSTANT.URL);
        canvasState.setSocket(socket);
    }, []);

    const {
        register, handleSubmit, formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            name: `Guest: ${Date.now().toString()}`,
            session: params.id || uuid(),
        }, mode: "onBlur"
    });

    const onSubmit = data => {
        handleOnSubmit(data, setModalVisible, setAlertText, setAlertVisible);
        navigate(`/${canvasState.sessionId}`);
    };

    return (
        <div className={css.form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={css.form__main}
            >
                <p className="text-center">
                    Вы можете создать новую сессию или присоединиться к существующей.
                </p>
                <label>Введите Ваше имя</label>
                <input {...register("name", {
                    required: {value: true, message: 'Необходимо ввести имя'},
                    minLength: {value: 3, message: 'Длина имени не менее 3 символов'},
                })}/>
                <p className="text-danger">{errors.name?.message}</p>

                <label>Введите session ID</label>
                <input className={css.sessionInput} {...register("session", {
                    required: {
                        value: true,
                        message: "Необходимо ввести session ID"
                    }
                })}
                       onClick={(e) => e.target.select()
                       }/>
                <p className="text-danger">{errors.session?.message}</p>

                <input type="submit" disabled={!isValid}/>
            </form>
        </div>
    );
};

export default Modal;