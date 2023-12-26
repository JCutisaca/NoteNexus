import style from '../Home/Home.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardNote from '../CardNote/CardNote'
import { getAllNotesByUserId } from '../../redux/actions'

const ArchivedNotes = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()

    const userId = useSelector(state => state.userId);
    const access_token = useSelector(state => state.access_token);

    const allNotesArchived = useSelector(state => state.allNotesArchived);
    const allNotesArchivedCopyArchived = useSelector(state => state.allNotesArchivedCopyArchived);

    const itemsPerPage = 8;
    const finalPage = Math.ceil(allNotesArchived?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    const visibleNotes = allNotesArchived?.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        dispatch(getAllNotesByUserId(userId, access_token))
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={style.container}>
            <>
                {(!visibleNotes?.length && allNotesArchivedCopyArchived?.length) ?
                    <div className={style.containerMessage}>
                        <h2 className={style.message}>Sorry, we couldn't find Notes that meet your search filters.</h2>
                    </div>
                    : visibleNotes?.map(({ id, title, tags, content, archived, createdAt, updatedAt }) => {
                        return (
                            <CardNote
                                key={id}
                                id={id}
                                title={title}
                                tags={tags}
                                content={content}
                                archived={archived}
                                createdAt={createdAt}
                                updatedAt={updatedAt}
                            ></CardNote>
                        )
                    })
                }
            </>
            {visibleNotes?.length ? <div className={style.pagination}>
                <div className={style.paginationContainer}>
                    <button className={style.button}
                        disabled={currentPage === 1}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(1)
                        }}>Start</button>
                    <button className={style.button}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(currentPage - 1)
                        }}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span className={style.page}>Page {currentPage} of {finalPage}</span>
                    <span className={style.pageNone}></span>
                    <button className={style.button}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(currentPage + 1)
                        }}
                        disabled={currentPage === finalPage}
                    >
                        Next
                    </button>
                    <button className={style.button}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage(finalPage)
                        }
                        }
                        disabled={currentPage === finalPage}
                    >End</button>
                </div>
                <div>
                    <span className={style.pageResponsive}>Page {currentPage} of {finalPage}</span>
                </div>
            </div> : null}
        </div>
    )
}

export default ArchivedNotes;