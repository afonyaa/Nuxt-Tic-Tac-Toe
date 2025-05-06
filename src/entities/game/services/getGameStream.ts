export default defineEventHandler((event) => {
    let counter = 0

    console.log('CREATE STREAM')
    const stream = createEventStream(event)

    const interval = setInterval(() => {
        console.log('PUSH', counter)
        counter += 1
        stream.push(counter.toString())
    }, 5000)

    stream.onClosed(async () => {
        clearInterval(interval)
        await stream.close()
    })

    return stream.send()

})