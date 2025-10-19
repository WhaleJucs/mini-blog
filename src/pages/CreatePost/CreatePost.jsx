import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>O que você está pensando hoje?</p>
            <form onSubmit={handleSubmit}>
                <label>Título:
                    <input
                        type='text'
                        name='title'
                        required
                        placeholder='Escreva o título do seu post'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label>Imagem:
                    <input
                        type='text'
                        name='image'
                        required
                        placeholder='Insira a URL da imagem'
                        onChange={(e) => setImage(e.target.value)}
                        value={title}
                    />
                </label>

                <label>Conteúdo:
                    <textarea
                        name='body'
                        required
                        placeholder='Escreva o conteúdo do post'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>

                <label>Tags:
                    <input
                        type='text'
                        name='tags'
                        required
                        placeholder='Insira as tags separadas por vírgula'
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>

                <button className='btn'>Criar Post</button>

                {/* {!loading && <button className='btn'>Criar Post</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>} */}
            </form>
        </div>
    )
}

export default CreatePost