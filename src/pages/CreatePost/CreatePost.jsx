import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    const { user } = useAuthValue()
    const { insertDocument, response } = useInsertDocument('posts')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        // Validar URL da imagem
        try {
            new URL(image)
        }

        catch (error) {
            setFormError('A imagem precisa ser uma URL.')
            return
        }

        // Criar array de tags
        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

        // Checar todos os valores
        if (!title || !image || !body || !tags) {
            setFormError('Por favor, preencha todos os campos!')
        }

        if (formError) return

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        // redirecionar para home
        navigate('/')
    }

    return (
        <div className={styles.create_post}>
            <h2>Criar Post</h2>
            <p>O que você está pensando hoje?</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type='text'
                        name='title'
                        required
                        placeholder='Escreva o título do seu post'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>

                <label>
                    <span>Imagem:</span>
                    <input
                        type='text'
                        name='image'
                        required
                        placeholder='Insira a URL da imagem'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>

                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name='body'
                        required
                        placeholder='Escreva o conteúdo do post'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>

                <label>
                    <span>Tags:</span>
                    <input
                        type='text'
                        name='tags'
                        required
                        placeholder='Insira as tags separadas por vírgula'
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>

                {!response.loading && <button className='btn'>Criar Post</button>}
                {response.loading && <button className='btn' disabled>Aguarde...</button>}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost