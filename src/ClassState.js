import React, { Component } from 'react'

const SECURITY_CODE = 'exe';

class ClassState extends Component {
    state = {
        error: false,
        loading: false,
        value: '',
        deleted: false,
        confirmed: false,
    }

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                if (this.state.value === SECURITY_CODE) {
                    
                } else {
                    this.setState({
                        error: true
                    })
                }
                this.setState({
                    loading: false
                })
            }, 2000);
        }

    }

    render() {
        const { name } = this.props;
        const { error, loading, value } = this.state;

        return (
            <>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad para comprobar que quieres eliminar.</p>
                {error && !loading && <p>Error: el código es incorrecto.</p>}
                {!error && loading && <p>Cargando...</p>}
                <input
                    disabled={loading}
                    value={value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    placeholder='Código de seguridad'
                />
                <button
                    disabled={loading}
                    onClick={() => this.setState({
                        loading: true,
                        error: false
                    })}
                >
                    Comprobar
                </button>
            </>
        )
    }
}

export { ClassState }