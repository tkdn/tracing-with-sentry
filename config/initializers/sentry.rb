Sentry.init do |config|
  config.dsn = 'https://9af18e1a244f479eaf6ee3d7757e4045@o410726.ingest.sentry.io/6074877'
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]

  # config.enabled_environments = %w[production]
  config.environment = Rails.env
  config.send_default_pii = true

  # Set tracesSampleRate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production
  config.traces_sample_rate = 1.0
  # or
  # config.traces_sampler = lambda do |context|
  #   true
  # end
end
