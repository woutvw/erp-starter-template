FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    libmagickwand-dev \
    imagemagick

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Imagick extension via PECL
RUN pecl install imagick-3.5.1 \
    && docker-php-ext-enable imagick

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Laravel installer globally
RUN composer global require laravel/installer

# Make sure the global Composer bin directory is in the PATH
ENV PATH="$PATH:/root/.composer/vendor/bin"

# Install Node.js (includes npm)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Verify npm and node installation
RUN node -v && npm -v

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set the Apache DocumentRoot to Laravel's public directory
RUN sed -i 's|/var/www/html|/var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Modify ImageMagick policy to allow PDF
# RUN sed -i 's/<policy domain="coder" rights="none" pattern="PDF"/<policy domain="coder" rights="read|write" pattern="PDF"/' /etc/ImageMagick-6/policy.xml

# Grant permissions to the public directory
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Increase PHP upload file size limits
RUN echo "upload_max_filesize=64M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size=64M" >> /usr/local/etc/php/conf.d/uploads.ini

# Expose port 80 for Apache
# EXPOSE 80

CMD ["apache2-foreground"]