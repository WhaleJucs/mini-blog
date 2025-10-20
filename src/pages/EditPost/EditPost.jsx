import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useFetchDocument } from '../../hooks/useFetchDocment'

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument('posts', id)

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(', ')
            setTags(textTags)
        }
    }, [post])

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
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar Post: {post.title}</h2>
                    <p>Altere os dados como desejar</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>
                                Título:
                            </span>
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
                            <span>
                                Imagem:
                            </span>
                            <input
                                type='text'
                                name='image'
                                required
                                placeholder='Insira a URL da imagem'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>

                        <p className={styles.preview_title}>Preview da Imagem atual:</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />

                        <label>
                            <span>
                                Conteúdo:
                            </span>
                            <textarea
                                name='body'
                                required
                                placeholder='Escreva o conteúdo do post'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            ></textarea>
                        </label>

                        <label>
                            <span>
                                Tags:
                            </span>
                            <input
                                type='text'
                                name='tags'
                                required
                                placeholder='Insira as tags separadas por vírgula'
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>

                        {!response.loading && <button className='btn'>Editar</button>}
                        {response.loading && <button className='btn' disabled>Aguarde...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost