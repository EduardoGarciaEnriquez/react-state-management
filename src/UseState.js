import React, { useState, useEffect } from 'react'

const SECURITY_CODE = 'state';

function UseState({ name }) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                if (value === SECURITY_CODE) {
                    setConfirmed(true)
                } else {
                    setError(true);
                }
                setLoading(false)
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
                <input disabled={loading} onChange={(e) => setValue(e.target.value)} value={value} placeholder='Código de seguridad' />
                <button
                    disabled={loading}
                    onClick={() => {
                        setLoading(true);
                        setError(false);
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
                    onClick={() => setDeleted(true)}
                >Sí, eliminar</button>
                <button
                    onClick={() => {
                        setConfirmed(false);
                        setValue('');
                    }}
                >No, Volver</button>
            </>
        )
    } else {
        return (
            <>
                <h2>{name} fue eliminado.</h2>
                <button
                    onClick={() => {
                        setDeleted(false);
                        setConfirmed(false);
                        setValue('')
                    }}
                >
                    Recuperar {name}
                </button>
            </>
        )
    }
}

export { UseState }