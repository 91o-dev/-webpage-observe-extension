setTimeout(() => {
    // "#app"が存在するか確認してから処理を行う
    const app = document.querySelector('#app');
    if (app) {
        // "comment_container"が存在するか確認
        const commentContainer = app.querySelector('.comment_container');

        if (commentContainer) {
            // 1秒後にMutationObserverの監視を開始
            // MutationObserverを作成
            const observer = new MutationObserver((mutationsList) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        // 新しく追加された.comment要素を検出
                        mutation.addedNodes.forEach(node => {
                            // nodeが .commentかつ.type_3の要素かどうか確認
                            if (node.classList && node.classList.contains('comment') && node.classList.contains('type_3')) {
                                // 新しく追加された.commentのテキストを取得
                                const commentBold = node.querySelector('.comment_body .comment_bold');
                                if (commentBold) {
                                    // テキストをスペースで分割して、最後の要素を取得
                                    const lastWord = commentBold.textContent.split(' ').pop();
                                    if (lastWord == "しょんぼり(0C)をあげました") {
                                        window.alert('スロットスタート！');
                                    }
                                } else {
                                    window.alert('No comment_bold found in the new comment.');
                                }
                            }
                        });
                    }
                }
            });

            // comment_containerの子要素（comment）の変更を監視する設定
            observer.observe(commentContainer, {
                childList: true,  // 子要素の追加・削除を監視
                subtree: false    // 子孫要素まで監視しない（直下の子要素だけ監視）
            });

            window.alert('MutationObserver is now watching for new comments.');
        } else {
            window.alert('No comment_container found.');
        }
    } else {
        window.alert('No app element found.');
    }
}, 1000);  // 1秒遅らせて監視を開始
