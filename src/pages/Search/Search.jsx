import { Link } from "react-router-dom"
import styles from "./Search.module.css"

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocments"
import { useQuery } from "../../hooks/useQuery"

// Components
import PostDetail from "../../components/PostDetail"

const Search = () => {
    const query = useQuery()
    const search = query.get('q')

    const { documents: posts } = useFetchDocuments('posts', search)

    return (
        <div className={styles.search_container}>
            <h2>Buscas</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados resultados...</p>
                        <Link to='/' className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts && posts.map((post) => (<PostDetail key={post.id} post={post} />))}
            </div>
        </div>
    )
}

export default Search