export const checkArrIncludesQuest = (arr, questId) => {

    if (arr.length === 0) return false
    let result
    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i].questionId === questId) {
            result = true;
            break;          
        }
        else {
            result = false;
        }
    }
    return result
}