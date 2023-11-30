import React, { FunctionComponent, createRef, useEffect } from 'react'

const src = 'https://utteranc.es/client.js'
const repo = 'boxak/boxak.github.io'

type UtteranceAttributesType = {
    src: string
    repo: string
    'issue-term': string
    label: string
    theme: string
    crossorigin: string
    async: string
}

const CommentWidget: FunctionComponent = function () {
    const element = createRef<HTMLDivElement>()

    useEffect(() => {
        if (element.current === null) return

        const utterances: HTMLScriptElement = document.createElement('script')

        const attributes: UtteranceAttributesType = {
            src,
            repo,
            'issue-term': 'pathname',
            label: 'Comment',
            theme: 'github-light',
            crossorigin: 'anonymous',
            async: 'true'
        }

        Object.entries(attributes).forEach(([key, value]) => {
            utterances.setAttribute(key, value)
        })

        element.current.appendChild(utterances)
    }, [])

    return <div ref={element} />
}

export default CommentWidget