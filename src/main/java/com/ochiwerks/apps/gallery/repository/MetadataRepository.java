package com.ochiwerks.apps.gallery.repository;

import com.ochiwerks.apps.gallery.domain.Metadata;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Metadata entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MetadataRepository extends JpaRepository<Metadata, Long> {
}
