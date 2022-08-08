import React, { useEffect, useReducer } from 'react'

const initialState = {
    error: false,
    loading: false,
    value: '',
    deleted: false,
    confirmed: false,
}

const SECURITY_CODE = 'reducer';

function UseReducer({ name }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { error, loading, value, deleted, confirmed } = state;

    const onConfirm = (confirm) => { dispatch({ type: [actionTypes.CONFIRM], payload: confirm }) }
    const onError = (error) => { dispatch({ type: [actionTypes.ERROR], payload: error }) }
    const onLoading = (loading) => { dispatch({ type: [actionTypes.LOADING], payload: loading }) }
    const onDelete = (del) => { dispatch({ type: [actionTypes.DELETE], payload: del }) }
    const onReset = () => { dispatch({ type: 'RESET' }) }
    const onChange = (event) => {
        dispatch({ type: [actionTypes.WRITE], payload: event.target.value })
    }

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                if (value === SECURITY_CODE) {
                    onConfirm(true);
                } else {
                    onError(true);
                }
                onLoading(false);
            }, 2000);
        }
    }, [loading, value])

    if (!deleted && !confirmed) {
        return (
            <>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                {error && !loading && <p>Error: el código es incorrecto.</p>}
                {!error && loading && <p>Cargando...</p>}
                <input disabled={loading} onChange={onChange} value={value} placeholder='Código de seguridad' />
                <button
                    disabled={loading}
                    onClick={() => {
                        onLoading(true);
                        onError(false);
                    }}
                >Comprobar</button>
            </>
        )
    } else if (confirmed && !deleted) {
        return (
            <>
                <h2>Eliminar {name}</h2>
                <p>¿Seguro que quieres eliminar {name}?</p>
                <button
                    onClick={() => onDelete(true)}
                >Sí, eliminar</button>
                <button onClick={onReset}>No, Volver</button>
            </>
        )
    } else {
        return (
            <>
                <h2>{name} fue eliminado.</h2>
                <button onClick={onReset}>Recuperar {name}</button>
            </>
        )
    }
}

const actionTypes = {
    ERROR: 'ERROR',
    LOADING: 'LOADING',
    CONFIRM: 'CONFIRM',
    DELETE: 'DELETE',
    RESET: 'RESET',
    WRITE: 'WRITE',
}

const reducerObject = (state, payload) => ({
    [actionTypes.ERROR]: {
        ...state,
        error: payload
    },
    [actionTypes.LOADING]: {
        ...state,
        loading: payload
    },
    [actionTypes.CONFIRM]: {
        ...state,
        confirmed: payload
    },
    [actionTypes.DELETE]: {
        ...state,
        deleted: payload
    },
    [actionTypes.RESET]: {
        error: false,
        loading: false,
        value: '',
        deleted: false,
        confirmed: false,
    },
    [actionTypes.WRITE]: {
        ...state,
        value: payload
    }
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer }