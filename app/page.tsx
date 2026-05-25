export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg-page px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-display-md text-text-primary mb-6">
          케이테마 교회에 오신 것을 환영합니다
        </h1>
        <p className="text-body-lg text-text-secondary mb-10">
          예배와 말씀, 사역과 공동체를 통해 하나님의 사랑을 전하는 교회입니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/about"
            className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            교회 소개
          </a>
          <a
            href="/sermons"
            className="inline-flex items-center justify-center rounded-lg border border-border-strong bg-bg-card px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-bg-subtle focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            설교 말씀
          </a>
        </div>
      </div>

      <section className="mt-24 max-w-3xl w-full">
        <div className="space-y-8">
          <div className="flex items-start gap-5 rounded-xl border border-border-default bg-bg-card p-6">
            <div className="flex-1">
              <h3 className="text-h4 text-text-primary mb-2">예배와 말씀</h3>
              <p className="text-body-sm text-text-secondary">
                주일예배와 수요예배, 금요기도회를 통해 말씀으로 세워집니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5 rounded-xl border border-border-default bg-bg-card p-6">
            <div className="flex-1">
              <h3 className="text-h4 text-text-primary mb-2">사역과 공동체</h3>
              <p className="text-body-sm text-text-secondary">
                다양한 사역과 공동체 모임을 통해 서로를 세워갑니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5 rounded-xl border border-border-default bg-bg-card p-6">
            <div className="flex-1">
              <h3 className="text-h4 text-text-primary mb-2">새가족 안내</h3>
              <p className="text-body-sm text-text-secondary">
                처음 오신 분들을 위한 안내와 교제를 준비하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
