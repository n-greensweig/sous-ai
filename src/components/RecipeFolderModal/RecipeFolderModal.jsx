

function RecipeFolderModal({closeModal}) {

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === 'modal-container') closeModal();
        }}>
            <div className="modal">
                This is our functioning modal
            </div>
        </div>
    )
}

export default RecipeFolderModal;